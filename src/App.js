import "./styles.css";
import React, { useState } from "react";
import ExamCard from "./components/ExamCard";
import Typography from '@mui/material/Typography';
import NewExamModal from "./components/NewExamModal";
import Button from '@mui/material/Button';

const newExams = () => {
  return {
    // 'CHEM 150':
    //   {
    //     'name' : 'CHEM 150',
    //     'time' : new Date()
    //   },
    // 'MATH 234':
    //   {
    //     'name' : 'MATH 234',
    //     'time' : new Date()
    //   }
  }
}

export default function App() {
  const [exams, setExams] = useState(newExams());
  const [addOpen, setAddOpen] = React.useState(false);

  const handleAddOpen = () => {
      setAddOpen(true);
  };

  const handleAddClose = () => {
      setAddOpen(false);
  };

  return (
    <div className="App">
      <Typography variant="h2" gutterBottom component="div">
        all exams
      </Typography>
      <div className="examList">
        { Object.values(exams).map(exam => <ExamCard key={exam.name} exam={ exam } setExams = {setExams} />) }
      </div>
      <Button variant="outlined" onClick={handleAddOpen}>
          New Exam
      </Button>
      <NewExamModal handleClose={handleAddClose} open={ addOpen } setExams={ setExams }/>
    </div>
  );
}
