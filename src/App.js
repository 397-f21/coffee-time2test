import { CountdownCircleTimer } from "react-countdown-circle-timer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import React, { useState } from "react";
import Typography from '@mui/material/Typography';

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

//const [date, setDate] = useState("");

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function App() {
  const [value, setValue] = React.useState(new Date());
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  //const [endTime, setEndTime] = useState(new Date());
  const remainingTime = value / 1000 - stratTime;
  const days = Math.floor(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;


  const handleChange = (newValue) => {
    setValue(newValue);
  };

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
      <div className="circles">
        <CountdownCircleTimer
          {...timerProps}
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
      <div className={"Local"}>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <DateTimePicker
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}
