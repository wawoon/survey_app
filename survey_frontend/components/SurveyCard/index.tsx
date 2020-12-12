import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 12,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const SurveyCard: React.FC<{
  survey: {
    title: string;
    content: string;
    id: number;
  };
}> = (props) => {
  const classes = useStyles();
  const survey = props.survey;

  return (
    <Link href={`/manage/surveys/${survey.id}`}>
      <a>
        <Card variant="outlined" className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {survey.title}
            </Typography>
            <Typography variant="h5" component="h2">
              {survey.content}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </a>
    </Link>
  );
};
