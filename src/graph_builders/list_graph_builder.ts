import { getLines } from '../helpers/get-lines';
import type { GraphLikeList, Vertex } from '../types';
import type { IGraphBuilder } from './graph_builder.interface';

class ListGraphBuilder implements IGraphBuilder {
  constructor(private readonly path: string) {}
  public async build(): Promise<GraphLikeList> {
    const lines = await getLines(this.path);
    const vertextLabels = lines.shift()?.split(/\s+/) ?? [];
    if (!vertextLabels.length) return [];

    const graph: GraphLikeList = vertextLabels.map(label => ({ label, adjacent: [] }));
    const vertexMap = new Map<string, Vertex>(graph.map(v => [v.label, v]));

    for (const line of lines) {
      const [label, ...adjacentLabels] = line.split(/\s+/);
      const currentVertex = vertexMap.get(label) as Vertex;
      currentVertex.adjacent.push(...adjacentLabels.map(adjLabel => vertexMap.get(adjLabel) as Vertex));
    }
    return graph;
  }
}

export { ListGraphBuilder };
