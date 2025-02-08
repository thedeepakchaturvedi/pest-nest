import { Injectable } from '@nestjs/common';

@Injectable()
export class PestService {
  private graphData: any = {}; // Default graph data

  setGraphData(data: any) {
    this.graphData = data;
  }

  getGraphData() {
    return this.graphData;
  }

  async generateDot(data: any[]): Promise<string> {
    const edges = [];
    const nodes = [];

    data.forEach((module) => {
      const moduleName = module.name;

      // Add the module as a node
      nodes.push(`"${moduleName}" [shape=box, style=filled, color=lightblue];`);

      // Add edges for imports with labels
      module.imports.forEach((imported) => {
        edges.push(`"${moduleName}" -> "${imported}" [label="imports"];`);
      });

      // Add providers as individual nodes and link them to the module
      module.providers.forEach((provider) => {
        const providerNode = `"${provider}"`;
        nodes.push(
          `${providerNode} [shape=ellipse, style=filled, color=lightyellow];`,
        );
        edges.push(`"${moduleName}" -> ${providerNode} [label="provides"];`);
      });
    });

    const dot = `
      digraph G {
        node [shape=box, style=filled, color=lightblue];
        ${nodes.join('\n')}
        ${edges.join('\n')}
      }
    `;
    return dot;
  }
}
