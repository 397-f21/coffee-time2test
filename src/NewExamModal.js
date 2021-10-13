import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Modal from 'react-modal';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import DateTimePicker from '@mui/lab/DateTimePicker';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { getTableSortLabelUtilityClass } from "@mui/material";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const NewExamModal = (closeModal, modalIsOpen, setIsOpen, testString) => {
    const [endTime, setEndTime] = useState(new Date());
  
    const handleDateChange = (newEndTime) => {
      setEndTime(newEndTime);
    };
  
    const [examList, setExamList] = useState([])
    const [AddingExamName, setAddExamName] = useState('')
  
    let subtitle;
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function addExam() {
      setIsOpen(false);
      console.log("original: " + examList)
      let newExamList = [...examList,{'name': AddingExamName, 'date': endTime}]
      setExamList(newExamList);
      console.log("new: " + newExamList)
      console.log("examList " + examList)
      setAddExamName('')
    }
  
    const handleChangeExamName = (x) => {
      setAddExamName(x.currentTarget.value)
    }
    console.log(JSON.stringify(modalIsOpen))
    console.log(testString)
    return (
        <Modal
        isOpen={true}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Enter Exam Information</h2>
      <div>Exam Name:</div>
      <form>
        <input type="text" value={AddingExamName} onChange={(x) => handleChangeExamName(x)} />
      </form>
      <div className={"Local"}>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <DateTimePicker
              value={endTime}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <button onClick={closeModal}>close</button>
      <button onClick={addExam}>Add</button>
    </Modal>
    )
}


export default NewExamModal