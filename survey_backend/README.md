# README

- Ruby 2.6.5
- Rails
- MySQL 5.7

# ER diagram

![ER diagram](../docs/er.png)

# How to setup

## development

```
bundle install
rails s
```

## production

### Configuration before start server

```
bundle install
RAILS_ENV=production rails db:create
RAILS_ENV=production rails db:migrate
```

### How to run server

```
RAILS_ENV=production rails s
```
