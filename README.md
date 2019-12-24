# GraphQL Queries

GraphQL with Apollo Server using NodeJS and MongoDB

## Installation

```bash
git clone https://github.com/zeshan-alphasquad/graphql-learning.git
```
```bash
cd project-folder
```
```bash
git checkout graphql-mongodb
```

Use the package manager [npm](https://npmjs.com) to install dependencis.

```bash
npm install
```

Database connection settings in config.js, do connection with Mongodb Server Database on your local PC.

```bash
npm start
```

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