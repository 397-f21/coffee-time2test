import "./styles.css";
import React, { useState } from "react";
import ExamTimer from "./components/ExamTimer";
import ExamCard from "./components/ExamCard";

const newExam = () => {
  return {
    'name' : 'MCAT',
    'time' : new Date()
  }
}

export default function App() {
  const [exam, setExam] = useState(newExam());

  return (
    <div className="App">
      {/* <ExamTimer exam={ exam } setExam = { setExam }/> */}
      <ExamCard exam={ exam } setExam = {setExam} />
    </div>
  );
}
