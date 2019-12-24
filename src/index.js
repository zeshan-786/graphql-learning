//Apollo Sever
const { ApolloServer } = require('apollo-server');

// Mongodb Configs run
require('../config')
var LinkModel = require('./mongoDB/models/LinkModel');

var idCount = 0

// Schema  Defination
const typeDefs = `
type Query {
  info: String!
  link(id: ID!): Link
  allLinks: [Link!]!
}

type Mutation {
  addLink(url: String!, description: String!): Link
  updateLink(id: ID!, url: String, description: String): Link
  deleteLink(id: ID!): Link
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

// Running Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});