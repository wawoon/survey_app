---
title: API Reference

language_tabs:
  - javascript

search: true

code_clipboard: true
---

# Introduction

This is an API documentation of survey_backend endpoints.
There are two api endpoints.

- manage/v1/\*: This is a management API for internal users and this needs an access_token.
- api/v1/\*: This is a public API which doesn't need access_token.

# Manage API

## Sign Up

POST `/manage/v1/signup`

```javascript
const ret = await axios.post(`${serverUrl()}/manage/v1/signup`, {
  email: data.email,
  name: data.name,
  password: data.password,
});
```

### Parameter

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| email     | string | The email address of the user |
| password  | string | The password of the user      |
| name      | string | The name of the user          |

### Response

| Parameter  | Type   | Description                             |
| ---------- | ------ | --------------------------------------- |
| auth_token | string | The JWT which is used as a access_token |

## Login

POST `/manage/v1/authenticate`

```javascript
const ret = await axios.post(`${serverUrl()}/manage/v1/authenticate`, {
  email: data.email,
  password: data.password,
});
```

### Parameter

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| email     | string | The email address of the user |
| password  | string | The password of the user      |

### Response

| Parameter  | Type   | Description                             |
| ---------- | ------ | --------------------------------------- |
| auth_token | string | The JWT which is used as a access_token |

## Get all surveys of current user

GET `manage/v1/surveys`

WIP

## Get a survey of current user

GET `manage/v1/surveys/:survey_id`

WIP

## Create a survey

POST `manage/v1/surveys`

# Public API

## Get All surveys

`/api/v1/surveys/`

```javascript
const res = await Axios.get(`${serverUrl()}/api/v1/surveys`);
```

### Parameter

No parameter is required

### Response

| Parameter | Type            | Description |
| --------- | --------------- | ----------- |
| surveys   | array of Survey |             |

## Get a survey

`/api/v1/surveys/:survey_id`

```javascript
const res =
  (await Axios.get) <
  DetailSurveyResponse >
  (`${serverUrl()}/api/v1/surveys/${survey_id}`,
  {
    headers: {
      "X-RESPONDENT-UUID": respondentUuid, // To identify the user have send response before.
    },
  });
```

### Parameter

| Parameter | Type         | Description                            |
| --------- | ------------ | -------------------------------------- |
| survey_id | id of Survey | URL part of /api/v1/surveys/:survey_id |

### Header

| Parameter         | Type   | Description                                        |
| ----------------- | ------ | -------------------------------------------------- |
| X-RESPONDENT-UUID | string | The respondent uuid returned when creating survey. |

## Create a Response to survey

```javascript
const ret = await Axios.post(
  `${process.env.SERVER_URL}/api/v1/surveys/${props.survey.id}/responses`,
  {
    response: {
      survey_id: 1,
      respondent_uuid: "uuid of the user",
      user_name: "Bob",
      user_email: "bob@example.com",
      choice_ids: [1, 2, 3],
    },
  }
);
```

### Parameter

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| response  | Response |             |

Response type is

| Parameter       | Type   | Description                                                   |
| --------------- | ------ | ------------------------------------------------------------- |
| survey_id       | number |                                                               |
| respondent_uuid | string | A uuid to identify who has submitted a response to the survey |
| user_name       | string |                                                               |
| user_email      | string |                                                               |
| choice_ids      | string | The array of choice's id                                      |

### Response

| Parameter       | Type     | Description                                                   |
| --------------- | -------- | ------------------------------------------------------------- |
| response        | Response |                                                               |
| respondent_uuid | String   | A uuid to identify who has submitted a response to the survey |

## Create a response to survey

`/api/v1/surveys/:survey_id/responses`

WIP
