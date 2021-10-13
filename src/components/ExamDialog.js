import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import ExamTimer from './ExamTimer';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExamDialog({ handleClose, open, setOpen, exam, setExams}) {

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
              Exit
            </Button>
          </Toolbar>
        </AppBar>
        
        <ExamTimer exam={ exam } setExams = { setExams }/>
        
      </Dialog>
    </div>
  );
}