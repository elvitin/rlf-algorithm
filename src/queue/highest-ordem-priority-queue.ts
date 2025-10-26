import type { GraphLikeList, Vertex } from '../types';
import { PriorityQueue } from './priority-queue';

class HighestOrdemPriorityQueue extends PriorityQueue<Vertex> {
  // FIXME: eleger se buildFrom vai pertencer a PrioryQueue
  public static buildFrom(vertices: GraphLikeList): HighestOrdemPriorityQueue {
    const queue = new HighestOrdemPriorityQueue();
    vertices.forEach(queue.add.bind(queue));
    return queue;
  }

  public addAll(vertices: Vertex[]): void {
    vertices.forEach(this.add.bind(this));
  }
  isLessThanCurrent(a: Vertex, b: Vertex): boolean {
    return b.adjacent.length < a.adjacent.length;
  }

  keyToCompare(elem: Vertex): string {
    return elem.label;
  }
}

export { HighestOrdemPriorityQueue };
