import React from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";


export default function DateSelector({ exam, setExams }) {
  
    const handleChange = (newEndTime) => {
    setExams(prevState => ({
      ...prevState,
      [exam.name]: {'name': exam.name, 'time': newEndTime}
    }));
  };

  return (
    <div className="container">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
            value={exam.time}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    </div>
  );
}
