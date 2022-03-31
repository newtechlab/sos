import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Router, Navigator } from 'react-router-dom';

test('renders learn react link', () => {
  render(
    <Router location={''} navigator={undefined}>
      <App />
    </Router>
  
  );
  const linkElement = screen.getByText(/Familieoversikt/i);
  expect(linkElement).toBeInTheDocument();
});
