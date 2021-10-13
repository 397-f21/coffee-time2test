import "./styles.css";
import React, { useState } from "react";
import ExamCard from "./components/ExamCard";
import Typography from '@mui/material/Typography';

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
      <Typography variant="h2" gutterBottom component="div">
        all exams
      </Typography>
      <ExamCard exam={ exam } setExam = {setExam} />
    </div>
  );
}
