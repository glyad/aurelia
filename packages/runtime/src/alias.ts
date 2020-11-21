import { Protocol, Metadata, Registration } from '@aurelia/kernel';
import type { Constructable, IResourceKind, ResourceDefinition, IContainer } from '@aurelia/kernel';

export function alias(...aliases: readonly string[]) {
  return function (target: Constructable) {
    const key = Protocol.annotation.keyFor('aliases');
    const existing = Metadata.getOwn(key, target);
    if (existing === void 0) {
      Metadata.define(key, aliases, target);
    } else {
      existing.push(...aliases);
    }
  };
}

export function registerAliases(aliases: readonly string[], resource: IResourceKind<Constructable, ResourceDefinition>, key: string, container: IContainer) {
  for (let i = 0, ii = aliases.length; i < ii; ++i) {
    Registration.aliasTo(key, resource.keyFrom(aliases[i])).register(container);
  }
}
