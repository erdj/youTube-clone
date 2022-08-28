import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { serverURL } from '../utils';
import Card from './Card';

const Container = styled.div`
  flex: 2;
`;

export const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(serverURL + `/videos/tags?tags=${tags}`);
        setVideos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type={'small'} key={video._id} video={video} />
      ))}
    </Container>
  );
};
