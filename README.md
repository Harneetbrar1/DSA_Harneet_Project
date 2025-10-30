# Smart Product Recommendation System

## Project Overview

This project implements a product recommendation system using advanced data structures and algorithms for an e-commerce platform. It demonstrates graph construction, heap operations, sorting algorithms, and real-world problem modeling.

## Data Structures Used

### 1. Hash Table (Product Storage)

- **Time Complexity**: O(1) for insert, delete, lookup
- **Space Complexity**: O(n)
- **Use Case**: Fast product retrieval by ID

### 2. Max Heap (Trending Products)

- **Time Complexity**: O(log n) insert/extract, O(1) peek
- **Space Complexity**: O(n)
- **Use Case**: Get most popular products efficiently

### 3. Min Heap (Budget Recommendations)

- **Time Complexity**: O(log n) insert/extract, O(1) peek
- **Space Complexity**: O(n)
- **Use Case**: Find cheapest products quickly

### 4. Weighted Graph (Product Relations)

- **Time Complexity**: O(V + E) for traversal
- **Space Complexity**: O(V + E)
- **Use Case**: Model relationships between products

## Algorithms Implemented

### 1. Breadth-First Search (BFS)

- **Time Complexity**: O(V + E)
- **Space Complexity**: O(V)
- **Purpose**: Content-based recommendations by exploring product relationships

### 2. Depth-First Search (DFS)

- **Time Complexity**: O(V + E)
- **Space Complexity**: O(V)
- **Purpose**: Find product clusters and communities

### 3. Dijkstra's Shortest Path

- **Time Complexity**: O((V + E) log V)
- **Space Complexity**: O(V)
- **Purpose**: Find optimal recommendation paths between products

### 4. Binary Search

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)
- **Purpose**: Fast price-based product searches

### 5. Merge Sort

- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- **Purpose**: Stable sorting of products by rating/popularity

### 6. Quick Sort

- **Time Complexity**: O(n log n) average, O(n²) worst
- **Space Complexity**: O(log n)
- **Purpose**: In-place sorting for large product datasets

## Recommendation Types

1. **Content-Based**: Uses BFS to find related products through graph relationships
2. **Popularity-Based**: Uses Max Heap to get trending products
3. **Budget-Conscious**: Uses Min Heap for price-filtered recommendations
4. **Hybrid**: Combines multiple algorithms with weighted scoring

## System Trade-offs

### Hash Table

- ✅ **Pros**: O(1) access, simple operations
- ❌ **Cons**: No sorting, linear search for non-ID queries

### Heaps

- ✅ **Pros**: Fast priority operations, guaranteed min/max access
- ❌ **Cons**: No arbitrary element search, heap property maintenance

### Weighted Graph

- ✅ **Pros**: Models complex relationships, supports multiple algorithms
- ❌ **Cons**: O(V²) space for dense graphs, relationship weight calculation complexity

### Algorithm Choices

- **BFS vs DFS**: BFS better for finding closest relationships, DFS better for clustering
- **Binary vs Linear Search**: Binary search much faster but requires sorted data
- **Merge vs Quick Sort**: Merge sort stable but uses more memory, Quick sort in-place but unstable

## How to Run

```bash
# Option 1: Using npm (recommended)
npm start

# Option 2: Direct execution
node src/index.js
```

## Project Features

- 8 sample products with realistic e-commerce data
- Multi-algorithm recommendation engine
- Real-time relationship graph construction
- Performance analytics and system metrics
- Comprehensive complexity analysis

This project demonstrates practical application of data structures and algorithms in building scalable recommendation systems for e-commerce platforms.
