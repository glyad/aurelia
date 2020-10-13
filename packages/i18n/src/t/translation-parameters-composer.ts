import { IContainer } from '@aurelia/kernel';
import {
  BindingMode,
  BindingType,
  IComposableController,
  IExpressionParser,
  IInstructionComposer,
  instructionComposer,
  IObserverLocator,
  IsBindingBehavior,
  LifecycleFlags,
} from '@aurelia/runtime';
import { TranslationBinding } from './translation-binding';
import {
  attributePattern,
  AttrSyntax,
  bindingCommand,
  getTarget,
} from '@aurelia/runtime-html';

import type {
  CallBindingInstruction,
  BindingSymbol,
  BindingCommandInstance,
  PlainAttributeSymbol,
} from '@aurelia/runtime-html';

export const TranslationParametersInstructionType = 'tpt';
// `.bind` part is needed here only for vCurrent compliance
const attribute = 't-params.bind';

@attributePattern({ pattern: attribute, symbols: '' })
export class TranslationParametersAttributePattern {
  public [attribute](rawName: string, rawValue: string, parts: string[]): AttrSyntax {
    return new AttrSyntax(rawName, rawValue, '', attribute);
  }
}

export class TranslationParametersBindingInstruction {
  public readonly type: string = TranslationParametersInstructionType;
  public mode: BindingMode.toView = BindingMode.toView;

  public constructor(
    public from: IsBindingBehavior,
    public to: string,
  ) {}
}

@bindingCommand(attribute)
export class TranslationParametersBindingCommand implements BindingCommandInstance {
  public readonly bindingType: BindingType.BindCommand = BindingType.BindCommand;

  public compile(binding: PlainAttributeSymbol | BindingSymbol): TranslationParametersBindingInstruction {
    return new TranslationParametersBindingInstruction(binding.expression as IsBindingBehavior, getTarget(binding, false));
  }
}

@instructionComposer(TranslationParametersInstructionType)
export class TranslationParametersBindingComposer implements IInstructionComposer {
  public constructor(
    @IExpressionParser private readonly parser: IExpressionParser,
    @IObserverLocator private readonly observerLocator: IObserverLocator,
  ) { }

  public compose(
    flags: LifecycleFlags,
    context: IContainer,
    controller: IComposableController,
    target: HTMLElement,
    instruction: CallBindingInstruction,
  ): void {
    TranslationBinding.create({ parser: this.parser, observerLocator: this.observerLocator, context, controller: controller, target, instruction, isParameterContext: true });
  }
}