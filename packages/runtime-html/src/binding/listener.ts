import { IDisposable, IIndexable, IServiceLocator } from '@aurelia/kernel';
import {
  DelegationStrategy,
  IBinding,
  IConnectableBinding,
  IDOM,
  IsBindingBehavior,
  LifecycleFlags,
} from '@aurelia/runtime';
import { IEventManager } from '../observation/event-manager';

import type { Scope } from '@aurelia/runtime';

export interface Listener extends IConnectableBinding {}
/**
 * Listener binding. Handle event binding between view and view model
 */
export class Listener implements IBinding {
  public interceptor: this = this;

  public isBound: boolean = false;
  public $scope!: Scope;
  public $hostScope: Scope | null = null;

  private handler!: IDisposable;

  public constructor(
    public dom: IDOM,
    public targetEvent: string,
    public delegationStrategy: DelegationStrategy,
    public sourceExpression: IsBindingBehavior,
    public target: Node,
    public preventDefault: boolean,
    public eventManager: IEventManager,
    public locator: IServiceLocator,
  ) {}

  public callSource(event: Event): ReturnType<IsBindingBehavior['evaluate']> {
    const overrideContext = this.$scope.overrideContext;
    overrideContext.$event = event;

    const result = this.sourceExpression.evaluate(LifecycleFlags.mustEvaluate, this.$scope, this.$hostScope, this.locator, null);

    Reflect.deleteProperty(overrideContext, '$event');

    if (result !== true && this.preventDefault) {
      event.preventDefault();
    }

    return result;
  }

  public handleEvent(event: Event): void {
    this.interceptor.callSource(event);
  }

  public $bind(flags: LifecycleFlags, scope: Scope, hostScope: Scope | null): void {
    if (this.isBound) {
      if (this.$scope === scope) {
        return;
      }

      this.interceptor.$unbind(flags | LifecycleFlags.fromBind);
    }

    this.$scope = scope;
    this.$hostScope = hostScope;

    const sourceExpression = this.sourceExpression;
    if (sourceExpression.hasBind) {
      sourceExpression.bind(flags, scope, hostScope, this.interceptor);
    }

    this.handler = this.eventManager.addEventListener(
      this.dom,
      this.target,
      this.targetEvent,
      this,
      this.delegationStrategy
    );

    // add isBound flag and remove isBinding flag
    this.isBound = true;
  }

  public $unbind(flags: LifecycleFlags): void {
    if (!this.isBound) {
      return;
    }

    const sourceExpression = this.sourceExpression;
    if (sourceExpression.hasUnbind) {
      sourceExpression.unbind(flags, this.$scope, this.$hostScope, this.interceptor);
    }

    this.$scope = null!;
    this.handler.dispose();
    this.handler = null!;

    // remove isBound and isUnbinding flags
    this.isBound = false;
  }

  public observeProperty(flags: LifecycleFlags, obj: IIndexable, propertyName: string): void {
    return;
  }

  public handleChange(newValue: unknown, previousValue: unknown, flags: LifecycleFlags): void {
    return;
  }
}
