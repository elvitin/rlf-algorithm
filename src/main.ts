import { ListGraphBuilder } from './graph_builders/list_graph_builder';
import { MatrixGraphBuilder } from './graph_builders/matrix_graph_builder';
import { RlfAlgorithm } from './rlf-algorithm';

(async function main() {
  //const builder = new ListGraphBuilder('./docs/ListaTesteAColoracao.txt');
  const builder = new MatrixGraphBuilder('./docs/MTesteAColoracao.txt');
  const graph = await builder.build();
  await new RlfAlgorithm(graph).start();
})();
