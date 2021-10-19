import "./styles.css";
import React, { useState } from "react";
import EventCard from "./components/EventCard";
import Typography from "@mui/material/Typography";
import AddEditEventModal from "./components/AddEditEventModal";
import Button from "@mui/material/Button";

const newExams = () => {
  return {};
};

export default function App() {
  const [exams, setExams] = useState(newExams());
  const [addOpen, setAddOpen] = React.useState(false);

  const handleAddOpen = (event) => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  return (
    <div className="App">
      <Typography id="title" variant="h2" component="div">
        all upcoming events
      </Typography>
      <Button variant="outlined" onClick={handleAddOpen}>
        Add new event
      </Button>
      <div id="eventList">
        {Object.keys(exams).length === 0 ? (
          <Typography id="empty-message" variant="h7" component="i">
            No events scheduled yet.
          </Typography>
        ) : (
          Object.values(exams).map((exam) => (
            <EventCard
              key={exam.name}
              exam={exam}
              setExams={setExams}
            />
          ))
        )}
      </div>
      <AddEditEventModal
        handleClose={handleAddClose}
        open={addOpen}
        setExams={setExams}
        exam={null}
      />
    </div>
  );
}
