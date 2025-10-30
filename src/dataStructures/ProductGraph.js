/**
 * WEIGHTED GRAPH DATA STRUCTURE
 * Models product relationships for sophisticated recommendations
 * Time Complexity: O(V + E) for traversal, O(1) for edge operations
 */

class ProductGraph {
  constructor() {
    this.adjacencyList = new Map();
    this.edges = new Map();
  }

  addVertex(productId) {
    if (!this.adjacencyList.has(productId)) {
      this.adjacencyList.set(productId, new Map());
    }
  }

  addEdge(product1, product2, weight = 1, type = 'similar') {
    this.addVertex(product1);
    this.addVertex(product2);
    
    // Add bidirectional edge
    this.adjacencyList.get(product1).set(product2, { weight, type });
    this.adjacencyList.get(product2).set(product1, { weight, type });
    
    // Store edge metadata
    const edgeKey = `${Math.min(product1, product2)}-${Math.max(product1, product2)}`;
    this.edges.set(edgeKey, { product1, product2, weight, type });
  }

  getNeighbors(productId) {
    return this.adjacencyList.get(productId) || new Map();
  }

  /**
   * Breadth-First Search for product recommendations
   * Time Complexity: O(V + E)
   */
  bfsRecommendations(startProduct, maxDepth = 2, maxResults = 5) {
    if (!this.adjacencyList.has(startProduct)) return [];

    const visited = new Set();
    const queue = [{ id: startProduct, depth: 0, weight: 1 }];
    const recommendations = [];
    
    visited.add(startProduct);

    while (queue.length > 0 && recommendations.length < maxResults) {
      const { id: currentId, depth, weight } = queue.shift();
      
      if (depth > 0) { // Don't include starting product
        const products = require('../data/products');
        const product = products[currentId];
        if (product) {
          recommendations.push({
            product,
            relationshipStrength: weight,
            depth,
            reason: `Related through ${depth} degree${depth > 1 ? 's' : ''} of separation`
          });
        }
      }

      if (depth < maxDepth) {
        const neighbors = this.getNeighbors(currentId);
        for (const [neighborId, edgeData] of neighbors) {
          if (!visited.has(neighborId)) {
            visited.add(neighborId);
            queue.push({
              id: neighborId,
              depth: depth + 1,
              weight: weight * edgeData.weight
            });
          }
        }
      }
    }

    return recommendations
      .sort((a, b) => b.relationshipStrength - a.relationshipStrength)
      .slice(0, maxResults);
  }

  /**
   * Depth-First Search for finding product clusters
   * Time Complexity: O(V + E)
   */
  dfsCluster(startProduct, visited = new Set(), cluster = []) {
    if (visited.has(startProduct)) return cluster;
    
    visited.add(startProduct);
    cluster.push(startProduct);
    
    const neighbors = this.getNeighbors(startProduct);
    for (const [neighborId] of neighbors) {
      this.dfsCluster(neighborId, visited, cluster);
    }
    
    return cluster;
  }

  findClusters() {
    const visited = new Set();
    const clusters = [];
    
    for (const productId of this.adjacencyList.keys()) {
      if (!visited.has(productId)) {
        const cluster = this.dfsCluster(productId, visited, []);
        clusters.push(cluster);
      }
    }
    
    return clusters;
  }
}

module.exports = ProductGraph;