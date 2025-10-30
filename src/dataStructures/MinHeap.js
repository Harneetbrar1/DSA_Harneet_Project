/**
 * MIN HEAP DATA STRUCTURE
 * Used for budget recommendations and cost optimization
 * Time Complexity: O(log n) for insert/extract, O(1) for peek
 */

const MaxHeap = require('./MaxHeap');

class MinHeap extends MaxHeap {
  constructor(compareFunction = null) {
    // Reverse comparison for min heap behavior
    super(compareFunction || ((a, b) => b.price - a.price));
  }

  extractMin() {
    return this.extractMax(); // Uses parent's extractMax with reversed comparison
  }

  peekMin() {
    return this.peek();
  }
}

module.exports = MinHeap;