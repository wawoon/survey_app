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
    fontWeight: "bold",
    paddingBottom: 4,
  },
  content: {
    color: "#666",
  },
  pos: {
    marginBottom: 12,
  },
});

export const SurveyCard: React.FC<{
  href: string;
  survey: {
    title: string;
    content: string;
    id: number;
  };
}> = (props) => {
  const classes = useStyles();
  const survey = props.survey;

  return (
    <Link href={props.href}>
      <a style={{ textDecoration: "none" }}>
        <Card variant="outlined" className={classes.root}>
          <CardContent>
            <Typography
              component="h2"
              variant="h5"
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {survey.title}
            </Typography>
            <Typography className={classes.content}>
              {survey.content}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};
