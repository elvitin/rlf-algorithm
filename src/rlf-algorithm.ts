import cloneDeep from 'lodash/cloneDeep';
import { GraphColoringMatrix } from './graph-coloring-matrix';
import { getLines } from './helpers/get-lines';
import { HighestOrdemPriorityQueue } from './queue/highest-ordem-priority-queue';
import type { GraphLikeList, Vertex } from './types';

class RlfAlgorithm {
  private searchVerticesByLabels(labels: string[], graph: Vertex[]): Vertex[] {
    return graph.filter(vertex => labels.some(label => label === vertex.label));
  }

  private _buildGraphList(lines: string[], graph: Vertex[]): void {
    while (lines.length) {
      const line = lines.shift() as string;
      const [label, ...adjacent] = line.split(' ');
      const vertex: Vertex = {
        label,
        adjacent: []
      };
      graph.push(vertex);

      //fazer chamada recursiva passando a fila
      this._buildGraphList(lines, graph);

      //quando desempilhar, `adjacent` vai dizer quais são os adjacentes
      //busco na fila os endereços dos adjacentes pelo label (retorno de objetos).
      //incluo na propriedade `adjacent` do `vertex`
      const vertices = this.searchVerticesByLabels(adjacent, graph);
      vertex.adjacent.push(...vertices);
    }
  }

  private buildGraphList(lines: string[]): GraphLikeList {
    lines.shift();
    const graph: GraphLikeList = [];
    this._buildGraphList(cloneDeep(lines), graph);
    return graph;
  }

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
    // read content (List of List)
    const lines = await getLines('./docs/ListaTesteAColoracaoV2.txt');
    const graph = this.buildGraphList(lines);
    this.displayGraph(graph);
    const startingVertex = this.getHighestOrdemVertex(graph);
    console.info({ startingVertex });

    const matrix = GraphColoringMatrix.build({ vertexLabels: graph.map(vertex => vertex.label) });
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
