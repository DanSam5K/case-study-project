import React from 'react';
import { render, cleanup } from '@testing-library/react';
import StoriesContainer from '../containers/StoriesContainer';
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

test('renders story container with a story', async () => {
  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT,
  }));
  getStory.mockImplementation(() => Promise.resolve(singularStory));
  getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

  const { getByText, queryByTestId } = render(<StoriesContainer />);
  await (() => [
    expect(getByText('Hacker News Top Stories')).toBeTruthy(),
    expect(getByText('Tarnished: Google Responds')).toBeTruthy(),
    expect(queryByTestId('story-by').textContent).toEqual('By: Dan Sam'),
  ]);
});
