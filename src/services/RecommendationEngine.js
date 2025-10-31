/**
 * SMART RECOMMENDATION ENGINE - Enhanced by Harneet
 * Main service that combines all algorithms for intelligent recommendations
 * Understanding by Harneet: This engine integrates multiple data structures for hybrid recommendations
 */

// Harneet's personalized product store
const myProductStore = require('../data/products');
const MaxHeap = require('../dataStructures/MaxHeap');
const MinHeap = require('../dataStructures/MinHeap');
const ProductGraph = require('../dataStructures/ProductGraph');
const SearchEngine = require('../algorithms/SearchEngine');

class RecommendationEngine {
  constructor() {
    // Understanding by Harneet: Setting up hybrid recommendation system
    this.graph = new ProductGraph();
    this.popularHeap = new MaxHeap(); // Changed from trendingHeap - Harneet
    this.priceHeap = new MinHeap();
    this.userPreferences = new Map();
    
    this.initializeSystem();
  }

  initializeSystem() {
    console.log("🚀 Initializing Smart Recommendation System...");
    
    this.buildProductGraph();
    
    Object.values(myProductStore).forEach(product => {
      this.popularHeap.insert(product); // Harneet: Using max heap for popular items
      this.priceHeap.insert(product);
    });
    
    this.initializeUserPreferences();
    
    console.log("✅ System initialized successfully!");
  }

  buildProductGraph() {
    const productArray = Object.values(myProductStore);
    
    productArray.forEach(product1 => {
      productArray.forEach(product2 => {
        if (product1.id !== product2.id) {
          const weight = this.calculateConnectionScore(product1, product2);
          if (weight > 0.1) {
            const type = this.determineRelationshipType(product1, product2);
            this.graph.addEdge(product1.id, product2.id, weight, type);
          }
        }
      });
    });
  }

  calculateConnectionScore(product1, product2) {
    // Understanding by Harneet: This calculates how connected two products are
    let weight = 0;
    
    // Category similarity (40%)
    if (product1.category === product2.category) {
      weight += 0.4;
      if (product1.subcategory === product2.subcategory) {
        weight += 0.2;
      }
    }
    
    // Brand loyalty (20%)
    if (product1.brand === product2.brand) {
      weight += 0.2;
    }
    
    // Price range similarity (15%)
    const priceDiff = Math.abs(product1.price - product2.price);
    const avgPrice = (product1.price + product2.price) / 2;
    const priceWeight = Math.max(0, 1 - (priceDiff / avgPrice));
    weight += 0.15 * priceWeight;
    
    // Tag overlap (15%)
    const commonTags = product1.tags.filter(tag => product2.tags.includes(tag));
    const tagWeight = commonTags.length / Math.max(product1.tags.length, product2.tags.length);
    weight += 0.15 * tagWeight;
    
    // Rating similarity (10%)
    const ratingDiff = Math.abs(product1.rating - product2.rating);
    const ratingWeight = Math.max(0, 1 - (ratingDiff / 5));
    weight += 0.1 * ratingWeight;
    
    return Math.min(weight, 1);
  }

  determineRelationshipType(product1, product2) {
    if (product1.category === product2.category) {
      if (product1.subcategory === product2.subcategory) {
        return 'similar';
      }
      return 'related';
    }
    if (product1.brand === product2.brand) {
      return 'brand';
    }
    return 'complementary';
  }

  initializeUserPreferences() {
    const userProfiles = [
      { id: 1, preferences: ['apple', 'premium', 'laptop'], budget: 2000 },
      { id: 2, preferences: ['android', 'samsung', 'smartphone'], budget: 1000 },
      { id: 3, preferences: ['accessories', 'protection', 'wireless'], budget: 200 }
    ];
    
    userProfiles.forEach(profile => {
      this.userPreferences.set(profile.id, profile);
    });
  }

  /**
   * Content-Based Recommendations using BFS
   */
  getContentBasedRecommendations(productId, count = 5) {
    console.log(`\n🎯 Getting content-based recommendations for product ${productId}...`);
    
    const recommendations = this.graph.bfsRecommendations(productId, 2, count);
    
    console.log(`Found ${recommendations.length} recommendations:`);
    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec.product.name} (Strength: ${rec.relationshipStrength.toFixed(2)}, ${rec.reason})`);
    });
    
    return recommendations;
  }

  /**
   * Trending Recommendations using Max Heap
   */
  getPopularItemRecommendations(count = 5) {
    // Understanding by Harneet: Using max heap to get most popular products efficiently
    console.log(`\n🔥 Getting top ${count} popular products...`);
    
    const popularItems = [];
    const tempHeap = new MaxHeap();
    
    Object.values(myProductStore).forEach(product => tempHeap.insert(product));
    
    for (let i = 0; i < count && !tempHeap.isEmpty(); i++) {
      popularItems.push(tempHeap.extractMax());
    }
    
    console.log("Popular products:");
    popularItems.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (Popularity: ${product.popularity}, Price: $${product.price})`);
    });
    
    return popularItems;
  }

  /**
   * Budget Recommendations using Min Heap and filtering
   */
  getBudgetRecommendations(maxPrice, count = 5) {
    console.log(`\n💰 Getting budget recommendations under $${maxPrice}...`);
    
    const filteredProducts = Object.values(myProductStore)
      .filter(product => product.price <= maxPrice)
      .sort((a, b) => a.price - b.price);
    
    const results = filteredProducts.slice(0, count);
    
    console.log(`Found ${results.length} products within budget:`);
    results.forEach((product, index) => {
      const savings = product.originalPrice - product.price;
      console.log(`${index + 1}. ${product.name} - $${product.price} ${savings > 0 ? `(Save $${savings.toFixed(2)})` : ''}`);
    });
    
    return results;
  }

  /**
   * Hybrid Recommendations combining multiple algorithms
   */
  getHybridRecommendations(productId, userProfile = null, count = 5) {
    console.log(`\n🧠 Getting hybrid recommendations for product ${productId}...`);
    
    const hybridScores = new Map();
    const allProducts = Object.values(myProductStore).filter(p => p.id !== productId);
    
    const weights = {
      contentBased: 0.4,
      popularity: 0.3,
      userPreference: 0.2,
      priceValue: 0.1
    };
    
    allProducts.forEach(product => {
      let score = 0;
      
      // Content-based score
      const neighbors = this.graph.getNeighbors(productId);
      const relationship = neighbors.get(product.id);
      if (relationship) {
        score += weights.contentBased * relationship.weight;
      }
      
      // Popularity score
      const maxPopularity = Math.max(...Object.values(myProductStore).map(p => p.popularity));
      score += weights.popularity * (product.popularity / maxPopularity);
      
      // User preference score
      if (userProfile) {
        const preferenceMatch = product.tags.filter(tag => 
          userProfile.preferences.includes(tag)
        ).length / product.tags.length;
        score += weights.userPreference * preferenceMatch;
      }
      
      // Price value score
      const valueScore = product.rating / (product.price / 100);
      const maxValue = Math.max(...allProducts.map(p => p.rating / (p.price / 100)));
      score += weights.priceValue * (valueScore / maxValue);
      
      hybridScores.set(product.id, { product, score });
    });
    
    const sortedRecommendations = Array.from(hybridScores.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
    
    console.log("Hybrid recommendations:");
    sortedRecommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec.product.name} (Score: ${rec.score.toFixed(3)})`);
    });
    
    return sortedRecommendations;
  }

  /**
   * Get system analytics
   */
  getSystemAnalytics() {
    const totalProducts = Object.keys(myProductStore).length;
    const totalEdges = this.graph.edges.size;
    const clusters = this.graph.findClusters();
    const avgClusterSize = clusters.reduce((sum, cluster) => sum + cluster.length, 0) / clusters.length;
    
    return {
      totalProducts,
      totalEdges,
      clusters: clusters.length,
      avgClusterSize,
      density: totalEdges / (totalProducts * (totalProducts - 1) / 2)
    };
  }
}

module.exports = RecommendationEngine;
