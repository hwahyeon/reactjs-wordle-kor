import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, Button, Typography as P } from '@mui/material';
import '../../styles/home.scss';
import icon from '../../assets/wordleicon.svg';

function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/play');
  };

  const [currentDateTime, setCurrentDateTime] = useState(() => {
    const now = new Date();
    return {
      date: now.toLocaleDateString(),
      // time: now.toLocaleTimeString(),
    };
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDateTime({
        date: now.toLocaleDateString(),
        // time: now.toLocaleTimeString(),
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container className='HomePage'>
      <Box className='content'>
        <img src={icon} alt="icon" className='icon' />
        <P className='header'>한글 Korean Wordle</P>
        <Button className='play_button' onClick={handleClick}>시작해볼까요?</Button>
        <Box>
          <P className='cont_txt'>이 게임은 Wordle의 한글 변형판입니다</P>
          <Button
            className='alink_button'
            component={Link}
            to="https://github.com/hwahyeon/reactjs-wordle-kor"
          >
            Source of this web
          </Button>
          <Button
            className='alink_button'
            component={Link}
            to="https://www.nytimes.com/games/wordle/index.html"
          >
            Original Wordle
          </Button>
        </Box>
        <Box>
          <P className='date'>{currentDateTime.date}</P>
          <P className='edit'>Edited by hwahyeon</P>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;