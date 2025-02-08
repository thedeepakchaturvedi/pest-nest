import { INestApplication, InjectionToken } from '@nestjs/common';
import { ApplicationConfig, ModuleRef, NestContainer } from '@nestjs/core';
import { Module } from '@nestjs/core/injector/module';
import { InternalCoreModule } from '@nestjs/core/injector/internal-core-module';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

interface DependencyArrayObject {
  token: string;
  name: string;
  imports: string[];
  providers: string[];
  controllers: string[];
  exports: string[];
}

export class Pest {
  private readonly app: INestApplication;
  private readonly container: NestContainer;
  constructor(application: INestApplication) {
    this.app = application;
    this.container = (application as any).container;
  }

  public start() {
    const dependencyArray: DependencyArrayObject[] = [];
    const modules = this.container.getModules().values();
    for (const module of modules) {
      if (module.metatype !== InternalCoreModule) {
        dependencyArray.push({
          token: module.token,
          name: module.name,
          imports: this.getModuleImports(module),
          providers: this.getModuleProviders(module),
          controllers: this.getModuleControllers(module),
          exports: this.getModuleExports(module),
        });
      }
    }

    const dependencyMap: Map<
      { name: string; id: string },
      DependencyArrayObject
    > = this.createModuleMap(dependencyArray);

    return dependencyMap;
  }

  private createModuleMap(modules: DependencyArrayObject[]) {
    const moduleMap = new Map<
      { name: string; id: string },
      DependencyArrayObject
    >();

    modules.map((module) => {
      const key = { name: module.name, id: module.token };
      moduleMap.set(key, module);
    });

    return moduleMap;
  }

  private getModuleImports(module: Module): string[] {
    const importsNames = [];
    const imports: Module[] = Array.from(module.imports.values());
    for (const importModule of imports) {
      if (importModule.metatype !== InternalCoreModule) {
        importsNames.push(importModule.name);
      }
    }

    return importsNames;
  }

  private getModuleProviders(module: Module): string[] {
    const providersNames = [];
    const providers: InstanceWrapper[] = Array.from(module.providers.values());
    for (const providerInstance of providers) {
      if (
        providerInstance.metatype !== module.metatype &&
        providerInstance.name !== ApplicationConfig.name &&
        providerInstance.name !== ModuleRef.name
      ) {
        providersNames.push(providerInstance.name);
      }
    }

    return providersNames;
  }

  private getModuleControllers(module: Module): string[] {
    const controllerNames = [];
    const controllers: InstanceWrapper[] = Array.from(
      module.controllers.values(),
    );

    for (const controllerInstance of controllers) {
      controllerNames.push(controllerInstance.name);
    }

    return controllerNames;
  }

  private getModuleExports(module: Module): string[] {
    const exportsNames = [];
    const exports: InjectionToken[] = Array.from(module.exports);
    for (const exportInstance of exports) {
      if (typeof exportInstance === 'function') {
        exportsNames.push(exportInstance.name);
      } else {
        exportsNames.push(exportInstance.toString() || 'unknown-export');
      }
    }

    return exportsNames;
  }
}
