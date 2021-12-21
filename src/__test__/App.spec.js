import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../App';
import { storyIds, singularStory } from '../fixtures';
import { getStory, getStoryIds } from '../services/hnApi';
import useInfiniteScroll from '../pagination/useInfiniteScroll';
import { STORY_INCREMENT } from '../constants';

beforeEach(cleanup);
jest.mock('../pagination/useInfiniteScroll.js');
jest.mock('../services/hnApi.js', () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn(),
}));

test('renders the application', async () => {
  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT,
  }));
  getStory.mockImplementation(() => Promise.resolve(singularStory));
  getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

  const { getByText, queryByTestId } = render(<App />);
  await (() => [
    expect(getByText('Hacker News Top Stories')).toBeTruthy(),
    expect(getByText('Tarnished: Google Responds')).toBeTruthy(),
    expect(queryByTestId('story-by').textContent).toEqual('By: Dan Sam'),
  ]);
});
