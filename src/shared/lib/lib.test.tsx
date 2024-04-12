import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { getQueryString } from './getQueryString';
import { updateLastQueryHistory } from './updateSearchHistory';
import { useDebounce } from './useDebounce';

describe('Query string getter tests', () => {
  test('Should create a simple param-value pair', () => {
    expect(getQueryString('name', 'foo')).toEqual('name=foo');
  });

  test('Should create query string from a string array', () => {
    expect(getQueryString('name', ['foo', 'bar', 'baz'])).toEqual(
      'name=%2Bfoo&name=%2Bbar&name=%2Bbaz',
    );
  });
});

describe('Search history update tests', () => {
  afterEach(() => localStorage.clear());

  test('Init search history', () => {
    expect(updateLastQueryHistory()).toHaveLength(0);
  });

  test('Should update search history', () => {
    expect(updateLastQueryHistory('name&=foo')).toHaveLength(1);
  });

  test('Check client storage', () => {
    const result = updateLastQueryHistory('name&=foo');
    expect(result).toHaveLength(1);
    expect(result).toStrictEqual(['name&=foo']);
  });
});

describe('Use debounce tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  test('Should set debounced value', () => {
    const {
      result: { current },
    } = renderHook(() => useDebounce('foo'));
    expect(current).toEqual('foo');
  });

  test('Should set value after passed delay', async () => {
    const { result: initialResult } = renderHook(() => useState(1));
    const delay = 500;

    const { result: debouncedResult, rerender } = renderHook(() =>
      useDebounce(initialResult.current[0], delay),
    );

    act(() => {
      initialResult.current[1](2);
      expect(debouncedResult.current).toEqual(1);
    });

    waitFor(() => {
      rerender();
    });

    act(() => {
      vi.advanceTimersByTime(delay);
    });

    expect(debouncedResult.current).toEqual(2);
  });
});
