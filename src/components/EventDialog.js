import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Typography from "@mui/material/Typography";
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import CircleTimer from './CircleTimer';
import DateSelector from './DateSelector';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EventDialog({ handleClose, open, exam, setExams}) {

  return (
    <div className="dialog">
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar id="appBar" sx={{ position: 'relative' }} style={{ background: '#e0e0e0', color:'black'}}>
          <Toolbar>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Back
            </Button>
          </Toolbar>
        </AppBar>
        
        <div className="container">
          <div className="titles">
            <Typography variant="h6" gutterBottom component="div">
              time until
            </Typography>
            <Typography variant="h2" gutterBottom component="div">
              {exam.name}
            </Typography>
          </div>
          <CircleTimer exam={ exam } setExams = { setExams }/>
          <DateSelector exam={ exam } setExams = { setExams }/>
        </div>

      </Dialog>
    </div>
  );
}