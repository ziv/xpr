# Core

## Preface

reflection [tbd].

## Dependency Injection

### Module

#### Imports

- Imports other modules to get access their exports.
- Can import only modules.

#### Providers

- Provide list of module context resolvers.
- Provider can be `Injectable` type or `FactoryProvider`.
- Both `FactoryProvider` & `Injectable` dependencies, should be accessed within
  module context.

#### Exports

- Exports providers and modules.
- Only local declared providers allowed to be exported.
- Only imported modules allowed re-export.

### Resolving

- `strict mode` All exported `Injectable` of `FactoryProvider` dependencies
  should be exported too.
- `loose mode` Missing dependencies searched in imported modules.

# Compiler

Takes a well-defined module and build its dependencies' tree for lazy resolving.
