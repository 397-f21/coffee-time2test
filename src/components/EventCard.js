import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircleTimer from "./CircleTimer";
import AddEditEventModal from './AddEditEventModal';

export default function EventCard({ exam, setExams, opener }) {
  const [editOpen, seteditOpen] = React.useState(false);

  const handleEditOpen = () => {
    seteditOpen(true);
  };

  const handleEditClose = () => {
    seteditOpen(false);
  };
  const deleteExam = () => {
    setExams((prevState) => {
    const newExams = { ...prevState };
    delete newExams[exam.id];
    return newExams;
    });

    };


  return (
    <Card className="card" sx={{ width: '100%' }}>
        <CardContent className="cardContent" sx={{ width: '80%' }}>
            <Typography variant="h5">
            {exam.name}
            </Typography>
            <CircleTimer exam={exam}></CircleTimer>
        </CardContent>
        <CardActions>
            <div className="cardActions" sx={{ width: '100%' }}>
                <Button
                    size="small" 
                    variant="outlined" 
                    color="secondary" 
                    onClick={handleEditOpen}>
                    Edit
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={deleteExam}
                    >
                    Delete
                </Button>
            </div>
            <AddEditEventModal
                handleClose={handleEditClose}
                open={editOpen}
                setExams={setExams}
                exam={exam}
            />
        </CardActions>
    </Card>
  );
}
