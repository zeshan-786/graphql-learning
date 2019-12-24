const { GraphQLServer } = require('graphql-yoga')
require('../config')
var UserModel = require('../models/UserModel');
var LinkModel = require('../models/LinkModel');

var idCount = 0
// 1
const typeDefs = `
type Query {
  info: String!
  users: [User!]!
  user(id: ID!): User
  feed: [Link!]!
  link(id: ID!): Link
  allLinks: [Link!]!
}

type Mutation {
  createUser(name: String!): User! 
  addLink(url: String!, description: String!): Link
  post(url: String!, description: String!): Link!
  updateLink(id: ID!, url: String, description: String): Link
  deleteLink(id: ID!): Link
}
type User {
  id: ID!
  name: String!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`
// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    link : async (parent, args) => {
            var link = await LinkModel.findOne(args)
            return link
    },
    allLinks : async () => {
        var links = await LinkModel.find({})
        return links
    }
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
  Mutation: {
    // add a link
   addLink: async (parent, args) => {
      const link = {
      id: `link-${idCount++}`,
      description: args.description,
      url: args.url,
    }
    var newLink = await LinkModel.create(link)
    return newLink
  },

    // Update a link
    updateLink : async (parent, args) => {
      let link= await LinkModel.findOneAndUpdate({id : args.id}, args, {new: true})
      return link
      
    },

    // Delete a link
    deleteLink: async (parent, args) => {
      let link = await LinkModel.findOneAndDelete({id : args.id})
      return link
    }

 }

}


// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))