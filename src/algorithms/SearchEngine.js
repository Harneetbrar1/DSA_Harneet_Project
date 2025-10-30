/**
 * SEARCH AND SORTING ALGORITHMS
 * Advanced search capabilities with multiple sorting implementations
 */

class SearchEngine {
  /**
   * Binary Search on sorted product array
   * Time Complexity: O(log n)
   */
  static binarySearchByPrice(products, targetPrice, tolerance = 10) {
    const sortedProducts = Object.values(products).sort((a, b) => a.price - b.price);
    
    let left = 0;
    let right = sortedProducts.length - 1;
    const results = [];
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const product = sortedProducts[mid];
      
      if (Math.abs(product.price - targetPrice) <= tolerance) {
        results.push(product);
        
        // Find all products within tolerance range
        let leftExpand = mid - 1;
        while (leftExpand >= 0 && 
               Math.abs(sortedProducts[leftExpand].price - targetPrice) <= tolerance) {
          results.unshift(sortedProducts[leftExpand]);
          leftExpand--;
        }
        
        let rightExpand = mid + 1;
        while (rightExpand < sortedProducts.length && 
               Math.abs(sortedProducts[rightExpand].price - targetPrice) <= tolerance) {
          results.push(sortedProducts[rightExpand]);
          rightExpand++;
        }
        
        break;
      } else if (product.price < targetPrice) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return results;
  }

  /**
   * Merge Sort implementation
   * Time Complexity: O(n log n), Space: O(n)
   */
  static mergeSort(arr, compareFunction) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = this.mergeSort(arr.slice(0, mid), compareFunction);
    const right = this.mergeSort(arr.slice(mid), compareFunction);
    
    return this.merge(left, right, compareFunction);
  }

  static merge(left, right, compareFunction) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
      if (compareFunction(left[leftIndex], right[rightIndex]) <= 0) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
    
    return result
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  }

  /**
   * Quick Sort implementation
   * Time Complexity: O(n log n) average, O(n²) worst
   */
  static quickSort(arr, compareFunction, low = 0, high = arr.length - 1) {
    if (low < high) {
      const pivotIndex = this.partition(arr, compareFunction, low, high);
      this.quickSort(arr, compareFunction, low, pivotIndex - 1);
      this.quickSort(arr, compareFunction, pivotIndex + 1, high);
    }
    return arr;
  }

  static partition(arr, compareFunction, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (compareFunction(arr[j], pivot) <= 0) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  /**
   * Advanced text search with relevance scoring
   * Time Complexity: O(n * m)
   */
  static advancedTextSearch(products, query, searchFields = ['name', 'description', 'tags']) {
    const queryTerms = query.toLowerCase().split(' ');
    const results = [];
    
    Object.values(products).forEach(product => {
      let relevanceScore = 0;
      let matchCount = 0;
      
      searchFields.forEach(field => {
        const fieldValue = Array.isArray(product[field]) 
          ? product[field].join(' ').toLowerCase()
          : (product[field] || '').toLowerCase();
        
        queryTerms.forEach(term => {
          if (fieldValue.includes(term)) {
            matchCount++;
            // Scoring: exact match > word boundary > partial match
            if (fieldValue === term) relevanceScore += 3;
            else if (new RegExp(`\\b${term}\\b`).test(fieldValue)) relevanceScore += 2;
            else relevanceScore += 1;
          }
        });
      });
      
      if (matchCount > 0) {
        results.push({
          product,
          relevanceScore,
          matchCount,
          matchPercentage: matchCount / queryTerms.length
        });
      }
    });
    
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
}

module.exports = SearchEngine;