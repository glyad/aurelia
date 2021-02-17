/**
 *
 * NOTE: This file is still WIP and will go through at least one more iteration of refactoring, commenting and clean up!
 * In its current state, it is NOT a good source for learning about the inner workings and design of the router.
 *
 */
import { IDisposable, IEventAggregator } from '@aurelia/kernel';
import { customAttribute, INode, bindable, BindingMode, CustomAttribute, ICustomAttributeController, ICustomAttributeViewModel } from '@aurelia/runtime-html';
import { RoutingInstruction } from '../instructions/routing-instruction.js';
import { ILinkHandler } from './link-handler.js';
import { IRouter, RouterNavigationEndEvent } from '../router.js';

@customAttribute('load')
export class LoadCustomAttribute implements ICustomAttributeViewModel {
  @bindable({ mode: BindingMode.toView })
  public value: unknown;

  private hasHref: boolean | null = null;

  // private observer: any;

  // public readonly $controller!: ICustomAttributeController<this>;

  private routerNavigationSubscription!: IDisposable;

  private readonly activeClass: string = 'load-active';
  public constructor(
    @INode private readonly element: INode<Element>,
    @IRouter private readonly router: IRouter,
    @ILinkHandler private readonly linkHandler: ILinkHandler,
    @IEventAggregator private readonly ea: IEventAggregator,
  ) { }

  public binding(): void {
    this.element.addEventListener('click', this.linkHandler.handler);
    this.updateValue();

    // const observerLocator = this.router.container.get(IObserverLocator);
    // this.observer = observerLocator.getObserver(this.router, 'activeComponents') as any;
    // this.observer.subscribe(this);
    this.routerNavigationSubscription = this.ea.subscribe(RouterNavigationEndEvent.eventName, this.navigationEndHandler);
  }

  public unbinding(): void {
    this.element.removeEventListener('click', this.linkHandler.handler);
    // this.observer.unsubscribe(this);
    this.routerNavigationSubscription.dispose();
  }

  public valueChanged(_newValue: unknown): void {
    this.updateValue();
  }

  private updateValue(): void {
    if (this.hasHref === null) {
      this.hasHref = this.element.hasAttribute('href');
    }
    if (!this.hasHref) {
      // TODO: Figure out a better value here for non-strings (using RoutingInstruction?)
      const value = typeof this.value === 'string' ? this.value : JSON.stringify(this.value);
      this.element.setAttribute('href', value);
    }
  }

  // public handleChange(): void {
  //   const controller = CustomAttribute.for(this.element, 'load')!.parent!;
  //   const created = this.router.applyLoadOptions(this.value as any, { context: controller });
  //   const instructions = RoutingInstruction.from(created.instructions);
  //   for (const instruction of instructions) {
  //     if (instruction.scope === null) {
  //       instruction.scope = created.scope;
  //     }
  //   }
  //   // TODO: Use router configuration for class name and update target
  //   if (this.router.checkActive(instructions)) {
  //     this.element.classList.add(this.activeClass);
  //   } else {
  //     this.element.classList.remove(this.activeClass);
  //   }
  // }

  private readonly navigationEndHandler = (_navigation: RouterNavigationEndEvent): void => {
    const controller = CustomAttribute.for(this.element, 'load')!.parent!;
    const created = this.router.applyLoadOptions(this.value as any, { context: controller });
    const instructions = RoutingInstruction.from(created.instructions);
    for (const instruction of instructions) {
      if (instruction.scope === null) {
        instruction.scope = created.scope;
      }
    }
    // TODO: Use router configuration for class name and update target
    if (this.router.checkActive(instructions)) {
      this.element.classList.add(this.activeClass);
    } else {
      this.element.classList.remove(this.activeClass);
    }
  };
}

