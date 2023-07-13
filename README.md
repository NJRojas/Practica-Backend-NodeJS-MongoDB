# Nodepop

A Node JS backend App to sell and buy what you like. To have it running you need Node and MongoDB installed, make sure you have those them installed.

## Deployment

Follow these steps to deploy the app.

### Install dependencies

```sh
    # Move to app directory 'nodepop'
    cd nodepop

    # Install ap dependencies
    npm install
```

### Setup enviroments variables

- Copy `.env.example` to `.env` and customize your local variables.

```sh
    cp .env.example .env
```

### Launch MongoDB Server

Make sure your MongoDB is running. In the console move to MongoDB directory and run the following script:

```sh
    # Move to the MongoDB directory
    # Then run the script
    ./bin/mongod --dbpath ./data
```

### Initialize the database

- Move to the nodepop directory and run the init script

```sh
    # Move to app directory
    cd nodepop

    # run the script. This adds some Ads and users to your database
    npm run initDB
```

### Deploy in Development environment:

- In the nodepop folder

```sh
    npm run dev

    #or
    npx nodemon
```

### Deploy in Production environment:

- In the nodepop folder

```sh
    npm start
```

### Thumbnail Microservice

This is a microservice used to upload image and convert them in small size. Setup as follow:

```sh
    #  Move to Thumbnail Microservice folder inside the nodepop directory
    cd nodepop/ThumbnailMicroservice

    # Then install mircoservices dependencies
    npm install

    # Lauch the service
    npm start
```

## API Documentation

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

- Filter samples

```sh
    // by price
    http://localhost:3000/?price=1000
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

For more detailed docu check http://localhost:3000/apiv1-docs/
