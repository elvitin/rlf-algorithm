abstract class PriorityQueue<T> {
	private readonly queue: T[] = [];

	public insert(elem: T): void {
		this.queue.push(elem);
		for (let i = this.queue.length - 1; i > 0; i--) {
			if (this.isLessThanCurrent(this.queue[i], this.queue[i - 1])) {
				[this.queue[i], this.queue[i - 1]] = [this.queue[i - 1], this.queue[i]];
				continue;
			}
			return;
		}
	}

	public remove(): T | undefined {
		return this.queue.shift();
	}
	abstract isLessThanCurrent(a: T, b: T): boolean;
}

export { PriorityQueue };
