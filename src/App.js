import { CountdownCircleTimer } from "react-countdown-circle-timer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import React, { useState } from "react";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function App() {
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  //const endTime = stratTime + 243248; // use UNIX timestamp in seconds
  const [endTime, setEndTime] = useState(new Date());
  const remainingTime = endTime/1000 - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <div style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'lightgray',
        width: "100%",
        height: "100%",
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'

      }}>
    <div style={{flex: 1,flexDirection: "row"}}>
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
          remainingTime - totalElapsedTime > hourSeconds
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
          remainingTime - totalElapsedTime > minuteSeconds
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#218380"]]}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > 0
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("seconds", getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer>
      </div>
      <DatePicker showTimeSelect selected={endTime} onChange={(date) => setEndTime(date)} />
    </div>
    
  );
}

