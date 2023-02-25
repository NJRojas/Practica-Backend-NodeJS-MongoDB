# Nodepop

## Install dependencies

```sh
npm install

nodemon
cross-env
mongoose
http-errors

```

### Start in developement node:

```sh
npm run dev
```

### Initialize the database 

```sh
npm run initDB
```

## Start a MongoDB Server in Macos or Linux

In the console go to MongoDB folder and:

```sh
./bin/mongod --dbpath ./data
```

## API Methods

### GET /api/ads
{
     "results": [
         {
            "_id": "63eaac1bd919d8e331535533",
            "article": "Monitor BenQ",
            "onSell": true,
            "price": 300,
            "imageUrl": "monitor-benQ.jpg",
            "tags": [ "work", "lifestyle"]
        },
         ...
     ]
 }

