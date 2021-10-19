import { CountdownCircleTimer } from "react-countdown-circle-timer";
import React from "react";
import Typography from "@mui/material/Typography";
import "../styles.css";

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
      <div className="dimension">{dimension}</div>
    </div>
  );
};

const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function CircleTimer({ exam }) {
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  var remainingTime = exam.time / 1000 - stratTime;
  var days = Math.floor(remainingTime / daySeconds);
  var daysDuration = days * daySeconds;

  return (
    <div id="circles">
      <CountdownCircleTimer
        {...timerProps}
        key={exam.time}
        colors={[["#7E2E84"]]}
        size={50}
        strokeWidth={3}
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime }) =>
          renderTime("days", getTimeDays(daysDuration - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        key={exam.time + 1}
        colors={[["#D14081"]]}
        size={50}
        strokeWidth={3}
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
        key={exam.time + 2}
        colors={[["#EF798A"]]}
        size={50}
        strokeWidth={3}
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > minuteSeconds,
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("min", getTimeMinutes(hourSeconds - elapsedTime))
        }
      </CountdownCircleTimer>
    </div>
  );
}
