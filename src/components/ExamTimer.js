import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import React, { useState } from "react";
import React from "react";
import Typography from "@mui/material/Typography";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

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

export default function ExamTimer({ exam, setExam }) {
  // const [endTime, setEndTime] = useState(new Date());
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  var remainingTime = exam.time / 1000 - stratTime;
  var days = Math.floor(remainingTime / daySeconds);
  var daysDuration = days * daySeconds;
  const [curKey, setCurKey] = React.useState(exam.time);

  const handleChange = (newEndTime) => {
    setExam({'name': exam.name, 'time': newEndTime});
    setCurKey(newEndTime);
  };

  return (
    <div className="container">
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
          key={curKey}
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
          key={curKey + 1}
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
          key={curKey + 2}
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            value={exam.time}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}
