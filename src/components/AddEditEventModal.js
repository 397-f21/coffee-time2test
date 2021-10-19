import React, { useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "../styles.css";

export default function AddEditEventModal(props) {
  const [newForm, setNewForm] = useState(
    props.exam
      ? props.exam
      : { id: Date.now().toString(), name: "", time: new Date() }
  );


  const handleDateChange = (newTime) => {
    setNewForm((prevState) => ({
      ...prevState,
      ["time"]: newTime,
    }));
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setNewForm((prevState) => ({
      ...prevState,
      ["name"]: newName,
    }));
  };

  const handleSubmit = () => {
    props.setExams((prevState) => ({
      ...prevState,
      [newForm.id]: newForm,
    }));
    // if it's adding, not editing, reset the form
    if (!props.exam) {
      setNewForm({ id: Date.now().toString(), name: "", time: new Date() });
    }
    props.handleClose();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>{props.exam ? "update event" : "enter new event details"}</DialogTitle>
        <DialogContent>
          <div className="addEditModal">
            <TextField
              autoFocus
              id="name"
              value={newForm.name}
              onChange={handleNameChange}
              label="event name"
              type="text"
              variant="standard"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={newForm.time}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                minDate = {new Date()}
                />
            </LocalizationProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
