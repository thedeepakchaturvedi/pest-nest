import { Module } from '@nestjs/common';
import { CatsModule } from './Cat/cat.module';
import { DogsModule } from './Dog/dog.module';
import { PestModule } from './Pest/modules/pest.module';

@Module({
  imports: [CatsModule, DogsModule, PestModule.forRoot({})],
  controllers: [],
  providers: [],
})
export class AppModule {
  onApplicationBootstrap(): void {
    console.log('Loading app module...');
  }

  onApplicationShutdown(): void {
    // here implement the logic to show the disconnceted graph if there is dependency issue
    console.log('Shutting down app module...');
  }
}
