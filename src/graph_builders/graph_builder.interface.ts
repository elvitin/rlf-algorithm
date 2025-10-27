import type { GraphLikeList } from '../types';

interface IGraphBuilder {
  build(): Promise<GraphLikeList>;
}

export type { IGraphBuilder };
