import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Layout } from './Layout';
import { renderComponent } from '../test';

describe('Layout render test', () => {
  test('Should render layout', () => {
    renderComponent(
      <Layout>
        <p>Mock children</p>
      </Layout>,
    );
    expect(screen.getByTestId('layout-header').className).toEqual(
      'bg-body-tertiary navbar navbar-expand-lg navbar-light',
    );
    expect(screen.getByTestId('main').className).toBe('p-5');
    expect(screen.getByText('Mock children').tagName).toEqual('P');
  });
});
