import React, { useEffect, useState } from 'react';
import Story from '../components/Story';
import { getStoryIds } from '../services/hnApi';
import {
  GlobalStyle,
  StoriesContainerWrapper,
} from '../styles/StoryContainerStyles';

const StoriesContainer = () => {
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    getStoryIds().then((data) => setStoryIds(data));
  }, []);
  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-test-id="stories-container">
        <h1>Hacker News Top Stories</h1>
        {storyIds.map((storyId) => (
          <Story key={storyId} storyId={storyId} />
        ))}
      </StoriesContainerWrapper>
    </>
  );
};

export default StoriesContainer;
