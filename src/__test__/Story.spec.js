import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Story from '../components/Story';
import { singularStory } from '../fixtures';
import { getStory } from '../services/hnApi';

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});
jest.mock('../services/hnApi.js', () => ({
  getStory: jest.fn(),
}));

test('renders the story component with content', async () => {
  getStory.mockImplementation(() => Promise.resolve(singularStory));

  const { getByText, queryByTestId } = render(<Story storyId={1} />);
  await (() => [
    expect(getByText('Hacker News Top Stories')).toBeTruthy(),
    expect(getByText('Tarnished: Google Responds')).toBeTruthy(),
    expect(queryByTestId('story-by').textContent).toEqual('By: Dan Sam'),
  ]);
});
