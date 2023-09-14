import React, { useState } from "react";
import { Container, Box, Button } from '@mui/material';
import '../../styles/wordleKor.scss';
import jsonData from '../../assets/dataset.json'
import CentralMessage from '../Common/CentralMessage.js'
import getDailyRandomNumber from '../Common/RandomNumber'

function WordleKorPage() {
  const [pred, setPred] = useState([]); // List of input
  const [colorList, setColorList] = useState([]) // List of color
  const [listLen, setListLen] = useState(5);
  const [submitBlock, setSubmitBlock] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [centerMsg, setCenterMsg] = useState('')

  console.log(getDailyRandomNumber())

  const answer = ['ㅇ', 'ㅏ', 'ㄴ', 'ㄴ', 'ㅏ']

  function showMessage(m) {
    setCenterMsg(m);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }
  
  const handleButtonClick = (value) => {
    if (pred.length < listLen){
      const newItem = {
        value: value,
        deletable: true,
        color: '',
      };
      setPred((pred) => [...pred, newItem]);
    } else {
      showMessage(msg.much)
    }

    if (pred.length % 5 !== 0){
      setSubmitBlock(true)
    }
  };

  const handleRemoveButtonClick = () => {
    if (pred[pred.length - 1]?.deletable) {
      let updatedList = [...pred];
      updatedList.pop();
      setPred(updatedList);
      }
  }
  
  const handleSubmitButtonClick = () => {
    if (pred.length % 5 !== 0){
      showMessage(msg.lack)
    } else if (!submitBlock){
      showMessage(msg.lack)
    } else {
      const submitted = pred.slice(-5).map(obj => obj.value).join('');
      if (!(jsonData.includes(submitted))){
        showMessage(msg.wrong)
      } else {
        setListLen((listLen) => listLen + 5);

        let updatedColorList = []
  
        for (let i = listLen - 5; i < listLen; i++){
          if (pred[i]) {
            if(answer[i - listLen + 5] === pred[i].value) {
              updatedColorList.push('green');
              pred[i].color = 'green';
            } else if (answer.includes(pred[i].value)){
              updatedColorList.push('yellow');
              pred[i].color = 'yellow';
            } else {
              updatedColorList.push('gray');
              pred[i].color = 'gray';
            }
            pred[i].deletable = false;
          } else {
            showMessage(msg.lack)
            // console.error(`pred[${i}] is undefined`);
          }
        }
  
        setPred([...pred])
  
        setColorList(colorList.concat(updatedColorList))
        setSubmitBlock(false)

        if ( 5 === updatedColorList.reduce((cnt, e) => {
          return cnt + (e === 'green' ? 1 : 0);
        }, 0)) {
          showMessage(msg.answer)
        }
      }
    }
  }

  const myButtons1 = [
    { id: 1, value: 'ㅂ' },
    { id: 2, value: 'ㅈ' },
    { id: 3, value: 'ㄷ' },
    { id: 4, value: 'ㄱ' },
    { id: 5, value: 'ㅅ' },
    { id: 6, value: 'ㅛ' },
    { id: 7, value: 'ㅕ' },
    { id: 8, value: 'ㅑ' },
    { id: 9, value: 'ㅐ' },
    { id: 10, value: 'ㅔ' },
  ];

  const myButton2 = [
    { id: 11, value: 'ㅁ' },
    { id: 12, value: 'ㄴ' },
    { id: 13, value: 'ㅇ' },
    { id: 14, value: 'ㄹ' },
    { id: 15, value: 'ㅎ' },
    { id: 16, value: 'ㅗ' },
    { id: 17, value: 'ㅓ' },
    { id: 18, value: 'ㅏ' },
    { id: 19, value: 'ㅣ' },
  ];

  const myButton3 = [
    { id: 20, value: 'ㅋ' },
    { id: 21, value: 'ㅌ' },
    { id: 22, value: 'ㅊ' },
    { id: 23, value: 'ㅍ' },
    { id: 24, value: 'ㅠ' },
    { id: 25, value: 'ㅜ' },
    { id: 26, value: 'ㅡ' },
  ];

  const msg = {
    lack: '글자 수가 충분하지 않습니다.',
    answer: '정답입니다.',
    much: '입력값을 초과했습니다',
    wrong: '단어를 찾을 수 없습니다.',
    end: '',
  }

  function keyboardColor(v) {
    const foundPreds = pred.filter(predItem => predItem.value === v);
    
    if (foundPreds.some(predItem => predItem.color === 'green')) {
      return 'green';
    }
    if (foundPreds.some(predItem => predItem.color === 'yellow')) {
      return 'yellow';
    }
    if (foundPreds.some(predItem => predItem.color === 'gray')) {
      return 'gray';
    }
  
    return ''; // 어떤 색상도 찾지 못했을 시
  }

  return (
    <Container className="WorldKorPage">
      <Box className="AnswerBoxes">
        {[...Array(6)].map((_, boxIndex) => (
          <Box key={boxIndex} className="AnswerBox">
            {[...Array(5)].map((_, itemIndex) => {
              const index = boxIndex * 5 + itemIndex;
              return (
                <div key={index} className={`${colorList[index]}`}>
                  {pred[index]?.value}
                </div>
              );
            })}
          </Box>
        ))}
      </Box>
      <Box className="keyBoard">
        <Box className="raw">
          {myButtons1.map((button) => (
            <Button key={button.id} onClick={() => handleButtonClick(button.value)} value={button.value} className={keyboardColor(button.value)}>
              {button.value}
            </Button>
          ))}
        </Box>
        <Box className="raw">
          {myButton2.map((button) => (
            <Button key={button.id} onClick={() => handleButtonClick(button.value)} value={button.value} className={keyboardColor(button.value)}>
              {button.value}
            </Button>
          ))}
        </Box>
        <Box className="raw">
          <Button onClick={() => handleSubmitButtonClick()}>제출</Button>
          {myButton3.map((button) => (
            <Button key={button.id} onClick={() => handleButtonClick(button.value)} value={button.value} className={keyboardColor(button.value)}>
              {button.value}
            </Button>
          ))}
          <Button onClick={() => handleRemoveButtonClick()}>지우기</Button>
        </Box>
      </Box>
      {isVisible ?
        <CentralMessage message={centerMsg} duration={2000} />
        :
        <div></div>}
    </Container>
  );
}

export default WordleKorPage;
