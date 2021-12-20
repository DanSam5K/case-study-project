import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStory } from '../services/hnApi';

const Story = ({ storyId }) => {
  const [story, setStory] = useState({});
  useEffect(() => {
    getStory(storyId).then((data) => data && data.url && setStory(data));
  }, []);
  return story && story.url ? (
    <>
      <a href={story.url}>
        <p>{story.title}</p>
      </a>
      By:
      <p>{story.by}</p>
      Posted:
      <p>{story.time}</p>
    </>
  ) : null;
};

Story.propTypes = {
  storyId: PropTypes.number.isRequired,
};

export default Story;
