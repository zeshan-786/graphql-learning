# GraphQL Queries

GraphQL with Apollo Server using NodeJS and MySql

## Installation

```bash
git clone https://github.com/zeshan-alphasquad/graphql-learning.git
```
```bash
cd project-folder
```
```bash
git checkout graphql-serverless
```

Use the package manager [npm](https://npmjs.com) to install dependencis.

```bash
npm install
```

Database connection settings in dbOps.js, do connection with MySql Server Database on your local PC.
run 
```bash
serverless offline
```

By default it will run on [localhost:3000](localhost:3000) to install dependencis.

## Usage

Add a Link
```
mutation {
  addLink(url: "www.twtr.com", description: "Social Platform") {
    id
    url
    description
  }
}
```

View All Links
```
query {
  allLinks{
    id
    url
    description
  }
}
```

Search a Link by ID
```
query {
  link(id: 22){
    id
    url
    description
  }
}
```

Delete a Link by ID
```
mutation {
  deleteLink(id: 33) {
    id
    url
    description
  }
}
```

Update a Link 
```
mutation{
  updateLink(id: "23", url:"www.twitter.com", description: "Social Platform"){
    id
    url
    description
  }
```