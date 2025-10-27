import fs from 'node:fs';
import path from 'node:path';
import type { IGraphBuilder } from './graph_builders/graph_builder.interface';
import { ListGraphBuilder } from './graph_builders/list_graph_builder';
import { MatrixGraphBuilder } from './graph_builders/matrix_graph_builder';
import { RlfAlgorithm } from './rlf-algorithm';

(async function main() {
  const [builderType, relativePath] = process.argv.slice(2);

  if (!builderType || !relativePath) {
    console.error('Execute com: npm run rlf:<matrix|list> <caminho-para-o-arquivo>');
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), relativePath);
  if (!fs.existsSync(filePath)) {
    console.error(`Erro: o arquivo não foi encontrado em "${filePath}"`);
    process.exit(1);
  }

  const builderMap: Record<string, new (path: string) => IGraphBuilder> = {
    matrix: MatrixGraphBuilder,
    list: ListGraphBuilder
  };

  const BuilderClass = builderMap[builderType];

  if (!BuilderClass) {
    console.error(`Erro: Tipo de builder "${builderType}" inválido. Use "matrix" ou "list".`);
    process.exit(1);
  }

  const builder = new BuilderClass(filePath);
  const graph = await builder.build();
  await new RlfAlgorithm(graph).start();
})();
