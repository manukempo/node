# Notes Solution

## Phone Model Example

```json
{
  "_id": "5f7ed860c765c43254852976",
  "make": "Samsung",
  "model": "Galaxy S10",
  "storage": "512GB",
  "monthlyPremium": 9.99,
  "yearlyPremium": 109.89,
  "excess": 150
}
```

- The POST and the GET all phones have been creating to make the development and testing easier.
- **IMPORTANT**: The bonus solution will change the model, so please clear the phones collection in the DB before you check out branches (_bonus-solution_).

## Node Vagrant Server

Base node.js app repository

### Setup

Clone the repository

```
vagrant up
vagrant ssh
cd /vagrant
node app.js
```

The server should then be accessible from localhost:1338 on them host machine

If you want to use a database:
Mysql and Mongo are both installed on the vagrant machine
To access the from a db manager, use a SSH tunnel:

```
localhost:2222
user: vagrant
pwd:  vagrant
```

Then use the usual basic connections ( Feel free to create your own users etc...):

Mongo:

```
127.0.0.1:27017
user: root
pwd:  root
```

Mysql:

```
127.0.0.1:3306
user: root
pwd:  root
```
