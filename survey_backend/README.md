# README

- Ruby 2.6.5
- Rails
- MySQL 5.7

# ER diagram

![ER diagram](../assets/er.png)

# How to setup

## development

### Configuration before starting server

```
bundle install
RAILS_ENV=production rails db:create
RAILS_ENV=production rails db:migrate
```

### How to run server

```
docker-compose up # This start MySQL at localhost:3308
rails s
```

## production

### Configuration before starting server

```
bundle install
RAILS_ENV=production rails db:create
RAILS_ENV=production rails db:migrate
```

### How to run server

```
docker-compose up # This start MySQL at localhost:3308
RAILS_ENV=production rails s
```

# Deployment

This application can be hosted by GAE Standard Ruby enrironment.
To do deploy, we need `env.yaml` file in the same directory of `app.yaml` file.

The format of `env.yaml` should be below.

```
env_variables:
  CLOUD_MYSQL_CONNECTION_NAME: replace_here
  CLOUD_MYSQL_PASSWORD: replace_here
  CLOUD_MYSQL_USER: replace_here
  SECRET_KEY_BASE: replace_here
```

The deployment command is:

```
gcloud beta app deploy app.yaml
```
