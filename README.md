# Nodepop

A Node JS backend App to sell and buy what you like. To have it running you need Node and MongoDB installed, make sure you have those them installed.

A production deployment can be seen at [**quantumpop.duckdns.org**](http://quantumpop.duckdns.org)

**React App** is deployed at [**react.quantumpop.duckdns.org**](http://react.quantumpop.duckdns.org)

A [**secret**](http://52.201.60.201) for you.

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

### Testing this APIs

- From a REST client, perform a login with a register user as follow to authenticate.

```sh
    http://quantumpop.duckdns.org/apiv1/login
    # method: POST
    # set these field in the body as x-wwww-form-urlencoded
    # email: c3po@quantumpop.net
    # password: supersecure-1!

    # This should return a JWT token, that needs to bet set in the header of any of the requests
```

- To get the list of ads.

```sh
    http://quantumpop.duckdns.org/apiv1/ads
    # DO NOT forget authentication
    # method: GET
```

- To post a new Ad.

```sh

    http://quantumpop.duckdns.org/apiv1/ads
     # DO NOT forget authentication
     # method: POST
     # In the body as 'form-data' add these data, sample
     {
        "article": "Monitor BenQ",
        "onSell": true,
        "price": 300,
        "imageUrl": "monitor-benQ.jpg",
        "tags": [ "work", "lifestyle"],
        "image": <file>
    }
```

### GET /apiv1/ads/

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

### GET /apiv1/ads/tags

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

### POST /apiv1/ads/

- Create new ads. Add an object of this form

```sh
{
    "_id": "63eaac1bd919d8e331535533",
    "article": "Monitor BenQ",
    "onSell": true,
    "price": 300,
    "imageUrl": "monitor-benQ.jpg",
    "tags": [ "work", "lifestyle"],
    "image": <file>
},
```

For more detailed docu check http://localhost:3000/apiv1-docs/
