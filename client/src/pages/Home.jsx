import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';
import { serverURL } from '../utils';
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(serverURL + `videos/${type}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video, i) => {
        return <Card key={video._id} video={video} />;
      })}
    </Container>
  );
};

export default Home;
