import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PestService } from './pest.service';
import { instance } from '@viz-js/viz';
import * as fs from 'fs/promises';
import { PestControllerQueryDto } from '../dto/pest.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('pest')
export class PestController {
  constructor(private readonly graphService: PestService) {}

  @Get('api')
  getGraphData() {
    const data = Array.from(this.graphService.getGraphData().values());
    return data; // Return the graph data from the service
  }

  @Get('graph')
  async renderGraph(@Query() query: PestControllerQueryDto): Promise<string> {
    const data = Array.from(this.graphService.getGraphData().values());

    // Convert the adjacency matrix to DOT format
    const dot = await this.graphService.generateDot(data);

    const viz = await instance();
    const svg = viz.renderFormats(dot, ['svg']);

    if (query && query.createSVG) {
      const filePath = './output/graph.svg';
      await fs.mkdir('./output', { recursive: true }); // Ensure output directory exists
      await fs.writeFile(filePath, svg.output.svg);
    }

    // Return an HTML page with the rendered SVG
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Graph Visualization</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f9f9f9;
          }
          svg {
            border: 1px solid #ccc;
            background-color: #fff;
          }
        </style>
      </head>
      <body>
        ${svg.output.svg}
      </body>
      </html>`;
  }
}
