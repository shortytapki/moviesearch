import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useState } from 'react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { MainPagination } from './Pagination';

expect.extend(matchers);

describe('Pagination tests', () => {
  test('Should render pagination and set active item', async () => {
    const { result, rerender } = renderHook(() => useState(1));
    render(
      <MainPagination
        entityName="testPagination"
        pagesCount={100}
        itemsPerPage={10}
        onPageChange={result.current[1]}
        currentPage={result.current[0]}
      />,
    );
    result.current[1](2);
    rerender();
    render(
      <MainPagination
        entityName="testPagination"
        pagesCount={100}
        itemsPerPage={10}
        onPageChange={result.current[1]}
        currentPage={result.current[0]}
      />,
    );
    waitFor(async () => {
      const pagination = await screen.findByTestId('2');
      expect(pagination.parentElement?.getAttribute('class')).toEqual(
        'page-item active',
      );
    });
  });
});
