# Notes Solution

## Phone Model Example

- **Basic Solution**

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

- **Bonus Solution**

```json
{
  "_id": "5f7f06978f042806076d2d8d",
  "make": "LG",
  "model": "G6",
  "storage": "32GB",
  "prices": [
    {
      "startingDate": "2020-10-09",
      "monthlyPremium": 4.69,
      "yearlyPremium": 51.59,
      "excess": 80
    },
    {
      "startingDate": "2020-10-08",
      "monthlyPremium": 4.49,
      "yearlyPremium": 49.39,
      "excess": 75
    }
  ]
}
```

- The POST and the GET all phones have been creating to make the development and testing easier.
- **IMPORTANT**: The bonus solution will change the model, so please clear the phones collection in the DB before you check out branches (_basic-solution_ vs _bonus-solution_).
- Easy way to start with the MongoDB (_phones collection_):
  ```
  db.phones.insertMany([
  {
    "make": "LG",
    "model": "G6",
    "storage": "32GB",
    "monthlyPremium": 4.49,
    "yearlyPremium": 49.39,
    "excess": 75
  },
  {
    "make": "Apple",
    "model": "iPhone 11",
    "storage": "128GB",
    "monthlyPremium": 7.99,
    "yearlyPremium": 87.89,
    "excess": 125
  },
  {
    "make": "Samsung",
    "model": "Galaxy S10",
    "storage": "512GB",
    "monthlyPremium": 9.99,
    "yearlyPremium": 109.89,
    "excess": 150
  }
  ])
  ```

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
pwd: vagrant

```

Then use the usual basic connections ( Feel free to create your own users etc...):

Mongo:

```

127.0.0.1:27017
user: root
pwd: root

```

Mysql:

```

127.0.0.1:3306
user: root
pwd: root

```
