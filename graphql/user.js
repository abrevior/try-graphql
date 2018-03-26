const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
  }
});

module.exports = {
  UserType
}