// GraphQL Server appollo-server
const { ApolloServer } = require('apollo-server');
// Database operations
var dbMySQL = require('./mySqlDatabase/dbOps')

// Schema definations
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
                    }`
// Resolver functions
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
     // Search single link
    link : async (parent, args) => {
            var link = await dbMySQL.searchLink(args.id)
            return link[0]
    },
    // Show all Links
    allLinks : async () => {
        var links = await dbMySQL.allLinks()
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
    let res = await dbMySQL.insertLink(args)
    let resSearch = await dbMySQL.searchLink(res.insertId)
    return resSearch[0]
  },

    // Update a link
    updateLink : async (parent, args) => {
      let link= await dbMySQL.updateLink(args)
      link.affectedRows ? link = args : null
      return link
      
    },

    // Delete a link
    deleteLink: async (parent, args) => {
      var resSearch = await dbMySQL.searchLink(args.id) 
      let linkDelete = await dbMySQL.deleteLink(args.id)
      linkDelete.affectedRows ? resSearch = resSearch[0] : resSearch = null
      return resSearch
    }

 }

}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});