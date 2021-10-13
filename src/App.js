import "./styles.css";
import React, { useState } from "react";
import ExamTimer from "./components/ExamTimer";

export default function App() {
  return (
    <div className="App">
      <ExamTimer></ExamTimer>
    </div>
  );
}
