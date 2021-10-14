import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExamDialog from './ExamDialog';



export default function ExamCard({exam, setExams}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const displayDate = exam.time.toLocaleString().replace(',', ' at');

  return (
    <div >
        <Card className="card" sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                {exam.name}
                </Typography>
                <Typography variant="h7" component="div">
                {displayDate.slice(0, -6) + displayDate.slice(-3)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" onClick={handleClickOpen}>
                    See More
                </Button>
            </CardActions>
        </Card>
        
        <ExamDialog handleClose={handleClose} open={ open } setOpen={setOpen} exam = { exam } setExams={ setExams }/>
    </div>
  );
}