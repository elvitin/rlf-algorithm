import cloneDeep from 'lodash/cloneDeep';
import { GraphColoringMatrix } from './graph_coloring_matrix';
import { HighestOrdemPriorityQueue } from './queue/highest_ordem_priority_queue';
import type { GraphLikeList, Vertex } from './types';

class RlfAlgorithm {
  constructor(private readonly graph: GraphLikeList) {}

  private getHighestOrdemVertex(graph: GraphLikeList): Vertex {
    return HighestOrdemPriorityQueue.buildFrom(graph).maximum() as Vertex;
  }

  private displayGraph(graph: Vertex[]): void {
    const clone = cloneDeep(graph);
    for (const vertex of clone) {
      process.stdout.write(`${vertex.label}: `);
      for (const adjacent of vertex.adjacent) {
        process.stdout.write(`[${adjacent.label}]`);
      }
      console.info();
    }
  }

  public async start() {
    this.displayGraph(this.graph);
    const startingVertex = this.getHighestOrdemVertex(this.graph);
    console.info({ startingVertex });

    const matrix = GraphColoringMatrix.build({ vertexLabels: this.graph.map(vertex => vertex.label) });
    console.info('\ninitial matrix');
    matrix.display();

    const queue = HighestOrdemPriorityQueue.buildFrom([startingVertex]);
    while (queue.size()) {
      queue.display();
      const nextVertex = queue.poll() as Vertex;
      queue.display();
      queue.addAll(nextVertex.adjacent.filter(vertex => !matrix.hasColorSetted(vertex.label)));

      matrix.setColor(
        nextVertex.label,
        nextVertex.adjacent.map(v => v.label)
      );
    }

    console.info('\nfinal matrix');
    matrix.display();
  }
}

export { RlfAlgorithm };
