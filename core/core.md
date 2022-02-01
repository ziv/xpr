# Core

## Preface

Reflection metadata is not yet part of the language.

## Dependency Injection

### Module

#### Imports

- Imports other modules to get access their exports.
- Can import only modules.

#### Providers

- Provide list of module context resolvers.
- Provider can be `Injectable` type or `FactoryProvider`.
- Both `FactoryProvider` & `Injectable` dependencies, should be accessed within module context.

#### Exports

- Exports providers and modules.
- Only local declared providers allowed to be exported.
- Only imported modules allowed re-export.

### Resolving

```typescript
@Injectable()
class SizeService {
  constructor(@Inject("size") public i: number) {
  }
}

const SizeToken = { token: "size", factory: () => 10 };

@Module({
  providers: [
    SizeToken,
    SizeService,
  ],
  exports: [SizeService],
})
class SizeModule {
}
```

# Compiler

Takes a well-defined module and build its dependencies' tree for lazy resolving.

## Container

Also known as `module`, containers are the building blocks of the application. Like JS modules, they can be imported,
and executed once. Each module leaves at a global scope once.

```
module A imports moudle B
module B executed and exists in global scope available to be imported again.
module B provide all it's exports to module A.
module C imports module B
module B is provided automaticaly from global scope.
```

## Module

Logical container. Provider DI mechanism using _Microsoft_ `tsyringe` library.

Module initiate with a new `dependency-container` to isolate its providers and allow each module to override any
imported providers.

> ### Dependency Injection
>
> _Microsoft_ `tsyringe` library used to provide the dependency injection. While
> `tsyringe` library provide global container and all other container are subset
> of the global one (reflect the resolution order), we use local fork
> implementation changed to allow creating of new container for each module.

All providers are _lazy_ and loaded only on demand. By default, all providers cache their instances.

### Resolving Order

Resolving order definition:

- Current module providers.
- Imported modules.
- Parent module if available.
