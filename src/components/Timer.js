import React from "react";

const Timer = () => {
  let curTime = new Date().getTime();
  // let  = new Date(countDownDate).getTime()
  // let timeDifference = countDownDate - curTime;
  return <div>{new Date().toLocaleString()}</div>;
};

export default Timer;
