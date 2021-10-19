import "react-datepicker/dist/react-datepicker.css";
import "../styles.css";
import React, { useState } from "react";

// import Modal from "react-modal";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function AddEditEventModal(props) {

  const [newForm, setNewForm] = useState({'name': '', 'time': new Date()});
  
  const handleDateChange = (newTime) => {
    setNewForm(prevState => ({
      ...prevState,
      ['time']: newTime
    }));
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setNewForm(prevState => ({
      ...prevState,
      ['name']: newName
    }));
  };

  const addExam = () => {
    // console.log(newForm);
    props.setExams(prevState => ({
      ...prevState,
      [newForm.name]: newForm
    }));
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle>Enter New Exam Information</DialogTitle>
        <DialogContent>
          <div className="addEditModal">
            <TextField
              autoFocus
              id="name"
              // value={newForm.name}
              onChange={handleNameChange}
              label="Exam name"
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
          <Button onClick={addExam}>Add</Button>
        </DialogActions>
      </Dialog>
      {/* <Modal
        isOpen={true}
        onAfterOpen={afterOpenModal}
        ariaHideApp={false}
        style={customStyles}
        onRequestClose={props.handleTogglePopup}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          Enter Exam Information
        </h2>
        <div>Exam Name:</div>
        <form>
          <input
            type="text"
            value={AddingExamName}
            onChange={(x) => handleChangeExamName(x)}
          />
        </form>
        <div className={"Local"}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={endTime}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <button onClick={props.handleTogglePopup}>close</button>
        <button onClick={addExam}>Add</button>
      </Modal> */}
      
    </div>
  );
};