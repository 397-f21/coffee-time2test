import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Modal from 'react-modal';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import DateTimePicker from '@mui/lab/DateTimePicker';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};



const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function App() {
  const [endTime, setEndTime] = useState(new Date());
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  //const [endTime, setEndTime] = useState(new Date());
  var remainingTime = endTime / 1000 - stratTime;
  var days = Math.floor(remainingTime / daySeconds);
  var daysDuration = days * daySeconds;
  const [curKey, setCurKey] = React.useState(endTime)

  const handleDateChange = (newEndTime) => {
    setEndTime(newEndTime);
    setCurKey(newEndTime);
  };

  const [examList, setExamList] = useState([])
  const [AddingExamName, setAddExamName] = useState('')

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function addExam() {
    setIsOpen(false);
    console.log("original: " + examList)
    let newExamList = [...examList,{'name': AddingExamName, 'date': endTime}]
    setExamList(newExamList);
    console.log("new: " + newExamList)
    console.log("examList " + examList)
    setAddExamName('')
  }

  const handleChangeExamName = (x) => {
    setAddExamName(x.currentTarget.value)
  }


  return (
    <div className="App">
      <div className="titles">
        <Typography variant="h6" gutterBottom component="div">
          time until
        </Typography>
        <Typography variant="h2" gutterBottom component="div">
          MCAT
        </Typography>
      </div>
      <button onClick={openModal}>Open Modal</button>
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Enter Exam Information</h2>
      <div>Exam Name:</div>
      <form>
        <input type="text" value={AddingExamName} onChange={(x) => handleChangeExamName(x)} />
      </form>
      <div className={"Local"}>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <DateTimePicker
              value={endTime}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <button onClick={closeModal}>close</button>
      <button onClick={addExam}>Add</button>
    </Modal>
      <div className="circles">
        <CountdownCircleTimer
          {...timerProps}
          key = {curKey}
          colors={[["#7E2E84"]]}
          duration={daysDuration}
          initialRemainingTime={remainingTime}
        >
          {({ elapsedTime }) =>
            renderTime("days", getTimeDays(daysDuration - elapsedTime))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          key = {curKey+1}
          colors={[["#D14081"]]}
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > hourSeconds,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("hours", getTimeHours(daySeconds - elapsedTime))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          key = {curKey+2}
          colors={[["#EF798A"]]}
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > minuteSeconds,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
          }
        </CountdownCircleTimer>
      </div>
    </div>
  );
}
