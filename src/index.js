/**
 * MAIN ENTRY POINT - SMART PRODUCT RECOMMENDATION SYSTEM
 * 
 * This is the main file that demonstrates the modular recommendation system.
 * All components are separated into focused modules for better maintainability.
 */

const RecommendationEngine = require('./services/RecommendationEngine');
const SearchEngine = require('./algorithms/SearchEngine');
// Harneet's personalized product store
const myProductStore = require('./data/products');

/**
 * Simple demo function to showcase the system
 */
function runDemo() {
  console.log("🚀 Smart Product Recommendation System Demo");
  console.log("=" .repeat(50));
  
  // Initialize the recommendation engine
  const engine = new RecommendationEngine();
  
  // Demo 1: Content-based recommendations for iPhone
  console.log("\n📱 iPhone 15 Pro Recommendations:");
  const recommendations = engine.getContentBasedRecommendations(2, 3);
  recommendations.forEach((rec, i) => {
    console.log(`${i+1}. ${rec.product.name}`);
  });
  
  // Demo 2: Popular products - Harneet's personalized approach
  console.log("\n🔥 Top Popular Products:");
  const popularItems = engine.getPopularItemRecommendations(3);
  popularItems.forEach((product, i) => {
    console.log(`${i+1}. ${product.name} (Popularity: ${product.popularity})`);
  });
  
  // Demo 3: Budget recommendations
  console.log("\n💰 Budget Products Under $100:");
  const budget = engine.getBudgetRecommendations(100, 3);
  budget.forEach((product, i) => {
    console.log(`${i+1}. ${product.name} - $${product.price}`);
  });
  
  // Demo 4: Hybrid recommendations
  console.log("\n🧠 Hybrid Recommendations for iPhone:");
  const hybrid = engine.getHybridRecommendations(2, { preferences: ['apple'] }, 3);
  hybrid.forEach((rec, i) => {
    console.log(`${i+1}. ${rec.product.name} (Score: ${rec.score.toFixed(3)})`);
  });
  
  // Demo 5: Advanced search
  console.log("\n🔍 Search Results for 'wireless':");
  const searchResults = SearchEngine.advancedTextSearch(myProductStore, 'wireless');
  searchResults.slice(0, 3).forEach((result, i) => {
    console.log(`${i+1}. ${result.product.name} (Relevance: ${result.relevanceScore})`);
  });
  
  // System analytics
  const analytics = engine.getSystemAnalytics();
  console.log("\n📊 System Analytics:");
  console.log(`Total Products: ${analytics.totalProducts}`);
  console.log(`Total Relationships: ${analytics.totalEdges}`);
  console.log(`Graph Density: ${analytics.density.toFixed(3)}`);
  
  console.log("\n✅ Demo completed successfully!");
  
  return {
    recommendations,
    popularItems,  // Changed from trending - Harneet
    budget,
    hybrid,
    analytics
  };
}

// Export for testing and module use - Harneet's personalized modules
module.exports = {
  RecommendationEngine,
  SearchEngine,
  myProductStore,
  runDemo
};

// Run demo if executed directly
if (require.main === module) {
  runDemo();
}