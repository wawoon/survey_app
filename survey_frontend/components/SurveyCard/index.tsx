import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "12px 0",
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

const formatDate = (date: Date) => {
  return `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

export const SurveyCard: React.FC<{
  href: string;
  survey: {
    title: string;
    content: string;
    id: number;
    response_count: number;
    created_at: string;
    updated_at: string;
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

            <Typography className={classes.content}>
              {survey.response_count} responses
            </Typography>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography className={classes.content}>
                {formatDate(new Date(survey.created_at))}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};
