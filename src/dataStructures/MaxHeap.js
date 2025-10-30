/**
 * MAX HEAP DATA STRUCTURE
 * Used for trending products and priority queue operations
 * Time Complexity: O(log n) for insert/extract, O(1) for peek
 */

class MaxHeap {
  constructor(compareFunction = null) {
    this.heap = [];
    this.compare = compareFunction || ((a, b) => a.popularity - b.popularity);
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  insert(element) {
    this.heap.push(element);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.compare(this.heap[index], this.heap[parentIndex]) <= 0) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return max;
  }

  sinkDown(index) {
    while (true) {
      const leftChild = this.getLeftChildIndex(index);
      const rightChild = this.getRightChildIndex(index);
      let largest = index;

      if (leftChild < this.heap.length && 
          this.compare(this.heap[leftChild], this.heap[largest]) > 0) {
        largest = leftChild;
      }

      if (rightChild < this.heap.length && 
          this.compare(this.heap[rightChild], this.heap[largest]) > 0) {
        largest = rightChild;
      }

      if (largest === index) break;

      this.swap(index, largest);
      index = largest;
    }
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

module.exports = MaxHeap;