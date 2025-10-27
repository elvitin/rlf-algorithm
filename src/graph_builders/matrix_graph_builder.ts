import { getLines } from '../helpers/get-lines';
import type { GraphLikeList } from '../types';
import type { IGraphBuilder } from './graph_builder.interface';

class MatrixGraphBuilder implements IGraphBuilder {
  constructor(private readonly path: string) {}
  public async build(): Promise<GraphLikeList> {
    const lines = await getLines(this.path);
    const vertexLabels = lines.shift()?.split(/\s+/) ?? [];
    if (!vertexLabels.length) return [];

    const graph: GraphLikeList = vertexLabels.map(label => ({ label, adjacent: [] }));

    lines.forEach((line, rowIndex) => {
      const currentVertex = graph[rowIndex];
      const connections = line.split(/\s+/);

      connections.forEach((cell, colIndex) => {
        if (cell === '1') {
          const adjacentVertex = graph[colIndex];
          currentVertex.adjacent.push(adjacentVertex);
        }
      });
    });

    return graph;
  }
}

export { MatrixGraphBuilder };
