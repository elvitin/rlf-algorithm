abstract class PriorityQueue<T> {
  private readonly queue: T[] = [];
  private readonly set: Set<string> = new Set<string>();
  public add(elem: T): void {
    if (this.contains(elem)) return;
    const key = this.keyToCompare(elem);
    this.set.add(key);
    this.queue.push(elem);
    for (let i = this.queue.length - 1; i > 0; i--) {
      if (this.isLessThanCurrent(this.queue[i], this.queue[i - 1])) {
        [this.queue[i], this.queue[i - 1]] = [this.queue[i - 1], this.queue[i]];
        continue;
      }
      return;
    }
  }

  public maximum(): T | undefined {
    return this.queue.at(0);
  }

  public poll(): T | undefined {
    const element = this.queue.shift();
    if (element) {
      const key = this.keyToCompare(element);
      this.set.delete(key);
    }
    return element;
  }
  public size(): number {
    return this.queue.length;
  }

  public contains(elem: T): boolean {
    const key = this.keyToCompare(elem);
    return this.set.has(key);
  }
  abstract isLessThanCurrent(a: T, b: T): boolean;

  abstract keyToCompare(elem: T): string;
}

export { PriorityQueue };
