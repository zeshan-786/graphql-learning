const { ApolloServer } = require("apollo-server-lambda");
const {typeDefs, resolvers} = require('./schema');

const server = new ApolloServer({ typeDefs, 
                                  resolvers,
                                  playground: true,
                                  introspection: true, 
                                });

exports.graphql = server.createHandler()

exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};