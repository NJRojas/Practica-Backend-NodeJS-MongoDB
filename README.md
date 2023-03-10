# Nodepop

### Install dependencies

```sh
npm install

nodemon
cross-env
mongoose
http-errors

```
### Start a MongoDB Server in Macos or Linux

- In the console go to MongoDB folder and execute:

```sh
./bin/mongod --dbpath ./data
```

### Initialize the database 

- Move to the nodepop folder and execute:

```sh
npm run initDB
```
### Start in developement node:

- In the nodepop folder

```sh
npm run dev
```

or 

```sh
npx nodemon
```

## API Methods

For a complete API documentation see [here](https://app.swaggerhub.com/apis-docs/neylarojas.developer/REST/1.0.0#/developers/searchAds)


### GET /api/ads/

- List existing ads.

```sh
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
```

### GET /api/ads/tags

- List existing tags.

```sh
{
    "tags": [
        "lifestyle",
        "mobile",
        "motor",
        "work"
    ]
}
```

### POST /api/ads/

- Create new ads. Add an object of this form

```sh
{
    "_id": "63eaac1bd919d8e331535533",
    "article": "Monitor BenQ",
    "onSell": true,
    "price": 300,
    "imageUrl": "monitor-benQ.jpg",
    "tags": [ "work", "lifestyle"]
},
```