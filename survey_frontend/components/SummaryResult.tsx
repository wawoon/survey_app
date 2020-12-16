import React from "react";
import { makeStyles, Typography, Card, CardContent } from "@material-ui/core";
import { DetailSurvey } from "../typings";

const useStyles = makeStyles({
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    color: "#666",
  },
});

const SurveyResultQustionCard: React.FC<{
  question: DetailSurvey["questions"][0];
}> = (props) => {
  const classes = useStyles();
  const question = props.question;
  return (
    <Card style={{ margin: "12px 0" }}>
      <CardContent>
        <Typography className={classes.header}>{question.name}</Typography>
        {question.choices.map((choice, i) => {
          return (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>
                  {i + 1}. {choice.name}
                </Typography>
                <Typography>
                  {choice.answer_count} votes{" "}
                  {question.answer_count != 0 &&
                    `(${(choice.answer_count / question.answer_count) * 100}%)`}
                </Typography>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export const SurveyResult: React.FC<{ survey: DetailSurvey }> = (props) => {
  const classes = useStyles();
  const survey = props.survey;

  return (
    <div>
      <Typography className={classes.header}>{survey.title}</Typography>
      <Typography className={classes.content}>{survey.content}</Typography>
      <Typography>{survey.response_count} people have submitted.</Typography>
      {survey.questions.map((q) => (
        <SurveyResultQustionCard key={q.id} question={q} />
      ))}
    </div>
  );
};
