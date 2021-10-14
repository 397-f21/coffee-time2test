import "./styles.css";
import React, { useState } from "react";
import ExamCard from "./components/ExamCard";
import Typography from '@mui/material/Typography';
import NewExamModal from "./components/NewExamModal";

const newExams = () => {
  return {
    'SAT':
      {
        'name' : 'SAT',
        'time' : new Date()
      },
    'ACT':
      {
        'name' : 'ACT',
        'time' : new Date()
      }
  }
}

export default function App() {
  const [exams, setExams] = useState(newExams());
   
  const [modalIsOpen, setIsOpen] = useState(false);

  const togglePopup=()=> {
      setIsOpen(!modalIsOpen);
    }

  {!modalIsOpen && <NewExamModal
      handleTogglePopup={togglePopup}
   />}

  return (
    <div className="App">
      <Typography variant="h2" gutterBottom component="div">
        all exams
      </Typography>
      <div className="examList">
        { Object.values(exams).map(exam => <ExamCard key={exam.name} exam={ exam } setExams = {setExams} />) }
      </div>
      {/* <ExamCard exam={ exam } setExams = {setExams} /> */}
    </div>
  );
}
