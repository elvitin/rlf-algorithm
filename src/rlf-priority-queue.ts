import { PriorityQueue } from './priority-queue';
import type { RlfQueue } from './types';

class RlfPriorityQueue extends PriorityQueue<RlfQueue> {
	isLessThanCurrent(a: RlfQueue, b: RlfQueue): boolean {
		return b.length < a.length;
	}
}

export { RlfPriorityQueue };
