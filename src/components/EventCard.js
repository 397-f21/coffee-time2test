import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EventDialog from './EventDialog';
// import CircleTimer from './CircleTimer';


export default function EventCard({exam, setExams}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const displayDate = exam.time.toDateString();
    // const timeString = exam.time.toLocaleTimeString()
    // const displayTime = "at " + timeString.slice(0, -6) + timeString.slice(-3);

  return (
    <div >
        <Card className="card" sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                {exam.name}
                </Typography>
                {/* <Typography variant="h7" component="div">
                {displayDate}
                </Typography>
                <Typography variant="h7" component="div">
                {displayTime}
                </Typography> */}
                {/* <CircleTimer exam={ exam } setExams = { setExams }/> */}

            </CardContent>
            <CardActions>
                <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                    count down
                </Button>
            </CardActions>
        </Card>
        
        <EventDialog handleClose={handleClose} open={ open } setOpen={setOpen} exam = { exam } setExams={ setExams }/>
    </div>
  );
}