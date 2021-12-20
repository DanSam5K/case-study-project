import React, { useEffect, useState } from 'react';
import Story from '../components/Story';
import { getStoryIds } from '../services/hnApi';

const StoriesContainer = () => {
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    getStoryIds().then((data) => setStoryIds(data));
  }, []);
  return storyIds.map((storyId) => <Story key={storyId} storyId={storyId} />);
};

export default StoriesContainer;
