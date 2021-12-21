import React, { useEffect, useState } from 'react';
import Story from '../components/Story';
import { getStoryIds } from '../services/hnApi';
import {
  GlobalStyle,
  StoriesContainerWrapper,
} from '../styles/StoryContainerStyles';
import useInfiniteScroll from '../pagination/useInfiniteScroll';

const StoriesContainer = () => {
  const { count } = useInfiniteScroll();
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    getStoryIds().then((data) => setStoryIds(data));
  }, []);
  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-test-id="stories-container">
        <h1>Hacker News Top Stories</h1>
        {storyIds.slice(0, count).map((storyId) => (
          <Story key={storyId} storyId={storyId} />
        ))}
      </StoriesContainerWrapper>
    </>
  );
};

export default StoriesContainer;
