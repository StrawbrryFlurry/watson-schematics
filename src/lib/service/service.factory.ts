import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';

import { DeclarationOptions, ModuleDeclarator } from '../../utils/module.declarator';
import { ModuleFinder } from '../../utils/module.finder';
import { NameParser } from '../../utils/name.parser';
import { isNil } from '../../utils/shared.util';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { ServiceOptions } from './service.schema';

export function main(options: ServiceOptions): Rule {
  options = transform(options);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        mergeWith(generate(options)),
      ])
    )(tree, context);
  };
}

function transform(source: ServiceOptions): ServiceOptions {
  const target: ServiceOptions = { ...source };
  target.metadata = "providers";
  target.type = "service";

  if (isNil(target.name)) {
    throw new SchematicsException("Option (name) is required.");
  }

  const { name, path } = new NameParser().parse(target);
  target.name = strings.dasherize(name);
  target.path = strings.dasherize(path);

  target.path = target.flat
    ? target.path
    : join(target.path as Path, target.name);
  return target;
}

function generate(options: ServiceOptions) {
  return (context: SchematicContext) =>
    apply(url("./files"), [
      options.spec ? noop() : filter((path) => !path.endsWith(".spec.ts")),
      template({
        ...strings,
        ...options,
      }),
      move(options.path),
    ])(context);
}

function addDeclarationToModule(options: ServiceOptions): Rule {
  return (tree: Tree) => {
    if (options.skipImport !== undefined && options.skipImport) {
      return tree;
    }
    options.module = new ModuleFinder(tree).find({
      name: options.name,
      path: options.path as Path,
    });
    if (!options.module) {
      return tree;
    }
    const content = tree.read(options.module).toString();
    const declarator: ModuleDeclarator = new ModuleDeclarator();
    tree.overwrite(
      options.module,
      declarator.declare(content, options as DeclarationOptions)
    );
    return tree;
  };
}
