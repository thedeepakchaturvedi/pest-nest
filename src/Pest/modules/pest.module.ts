import { Module, INestApplication } from '@nestjs/common';
import { PestService } from './pest.service';
import { PestController } from './pest.controller';
import { Pest } from '../framework/pest';

@Module({
  controllers: [PestController], // Register the controller for the pest endpoints
  providers: [],
})
export class PestModule {
  constructor() {}

  static forRoot(graphData: any) {
    return {
      module: PestModule,
      providers: [
        {
          provide: PestService,
          useFactory: () => {
            const pestService = new PestService();
            pestService.setGraphData(graphData);
            return pestService;
          },
        },
      ],
    };
  }

  attachToApp(app: INestApplication) {
    const pest = new Pest(app);
    const graphData = pest.start();
    const graphService = app.get(PestService);
    graphService.setGraphData(graphData);
  }
}
