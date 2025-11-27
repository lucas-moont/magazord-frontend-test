import { describe, it, expect } from 'vitest';
import { getPaginationPages, calculatePagination } from './pagination-calculator';

describe('Pagination Utils', () => {
  describe('getPaginationPages', () => {
    it('should return all pages when total pages is 7 or less', () => {
      expect(getPaginationPages(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(getPaginationPages(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should show ellipsis at the end when on first pages', () => {
      // Current: 1, Total: 20 -> [1, 2, 3, 4, '...', 20]
      expect(getPaginationPages(1, 20)).toEqual([1, 2, 3, 4, '...', 20]);
      expect(getPaginationPages(2, 20)).toEqual([1, 2, 3, 4, '...', 20]);
      expect(getPaginationPages(3, 20)).toEqual([1, 2, 3, 4, '...', 20]);
    });

    it('should show ellipsis at the start when on last pages', () => {
      // Current: 20, Total: 20 -> [1, '...', 17, 18, 19, 20]
      expect(getPaginationPages(20, 20)).toEqual([1, '...', 17, 18, 19, 20]);
      expect(getPaginationPages(19, 20)).toEqual([1, '...', 17, 18, 19, 20]);
      expect(getPaginationPages(18, 20)).toEqual([1, '...', 17, 18, 19, 20]);
    });

    it('should show ellipsis on both sides when in the middle', () => {
      // Current: 10, Total: 20 -> [1, '...', 9, 10, 11, '...', 20]
      expect(getPaginationPages(10, 20)).toEqual([1, '...', 9, 10, 11, '...', 20]);
    });
  });

  describe('calculatePagination', () => {
    it('should calculate pagination metadata correctly', () => {
      const totalItems = 45;
      const itemsPerPage = 10;

      // Page 1
      expect(calculatePagination(totalItems, itemsPerPage, 1)).toEqual({
        totalPages: 5,
        startIndex: 0,
        endIndex: 10,
        hasNextPage: true,
        hasPreviousPage: false,
      });

      // Page 3
      expect(calculatePagination(totalItems, itemsPerPage, 3)).toEqual({
        totalPages: 5,
        startIndex: 20,
        endIndex: 30,
        hasNextPage: true,
        hasPreviousPage: true,
      });

      // Last Page (5)
      expect(calculatePagination(totalItems, itemsPerPage, 5)).toEqual({
        totalPages: 5,
        startIndex: 40,
        endIndex: 50, // Slice handles out of bounds gracefully
        hasNextPage: false,
        hasPreviousPage: true,
      });
    });

    it('should handle empty items', () => {
      expect(calculatePagination(0, 10, 1)).toEqual({
        totalPages: 0,
        startIndex: 0,
        endIndex: 10,
        hasNextPage: false,
        hasPreviousPage: false,
      });
    });
  });
});
