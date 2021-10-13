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
  return (
    <div >
        <Card className="card" sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                {exam.name}
                </Typography>
                <Typography variant="h7" component="div">
                {"" + exam.time}
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