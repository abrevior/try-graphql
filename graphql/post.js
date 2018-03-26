const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');
const Post = require('../database/models/post');
const User = require('../database/models/user');

const UserType = new GraphQLObjectType({
  name: 'UserType',
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
    }
  }
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    _id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    topic: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    authorUserId: {
      type: GraphQLString,
    },
    author: {
      type: UserType,
      resolve: async (root, args) => {
        return User.findById(root.authorUserId);
      }
    }
  }
});



const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    
  }
})

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

module.exports = {
  PostType,
  schema
}
