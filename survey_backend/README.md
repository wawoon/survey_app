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
