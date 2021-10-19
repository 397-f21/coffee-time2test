import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EventDialog from "./EventDialog";
import CircleTimer from "./CircleTimer";
// import CircleTimer from './CircleTimer';

export default function EventCard({ exam, setExams, opener }) {
  const [open, setOpen] = React.useState(false);

  const deleteExam = () => {
    // console.log(newForm);
    setExams((prevState) => {
    const newExams = { ...prevState };
    delete newExams[exam.id];
    return newExams;
    });

    };


  return (
    <div>
      <Card className="card" sx={{ minWidth: 275 }}>
        <CardContent className="cardContent">
          <Typography variant="h5" component="div">
            {exam.name}
          </Typography>
          <CircleTimer exam={exam}></CircleTimer>
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="secondary" onClick={opener}>
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={deleteExam}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
