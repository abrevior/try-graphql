const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');
const User = require('../database/models/user');
const Post = require('../database/models/post');
const userHelper = require('../database/helpers/user');
const { UserType } = require('./user');

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
      type: GraphQLString
    },
    author: {
      type: UserType,
      resolve: async (root, args) => {
        return User.findById(root.authorUserId);
      }
    }
  }
});

const UserWithPost = new GraphQLObjectType({
  name: 'UserWithPost',
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
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (root, args) => {
        return Post.find({ authorUserId: root._id });
      }
    }
  }
});

const FilterInput = new GraphQLInputObjectType({
  name: 'FilterInput',
  fields: {
    title: {
      type: GraphQLString,
    },
    topic: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    authorUserId: {
      type: GraphQLString
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserWithPost,
      args: {
        _id: {
          type: GraphQLString
        }
      },
      resolve: async (root, args) => {
        return User.findById(args._id);
      }
    },
    users: {
      type: new GraphQLList(UserWithPost),
      args: {
        firstName: {
          type: GraphQLString
        }
      },
      resolve: async (root, args) => {
        return User.find(args);
      }
    },
    post: {
      type: PostType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (root, args) => {
        return Post.findById(args._id);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      args: {
        filter: {
          type: FilterInput
        }
      },
      resolve: async (root, args) => {
        return Post.find(args.filter);
      }
    }
  }
});

const inputUserType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

const inputLoginType = new GraphQLInputObjectType({
  name: 'UserLoginInput',
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

const authPayload = new GraphQLObjectType({
  name: 'AuthPayload',
  fields: {
    token: {
      type: GraphQLString
    },
    user: {
      type: UserType
    }
  }
})



const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
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
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        user: {
          type: new GraphQLNonNull(inputUserType)
        }
      },
      resolve: async (root, args) => {
        return userHelper.createUser(
          args.user.firstName,
          args.user.lastName,
          args.user.email,
          args.user.password
        );
      }
    },
    login: {
      type: authPayload,
      args: {
        user: {
          type: new GraphQLNonNull(inputLoginType)
        }
      },
      resolve: async (root, args) => {
        console.log('args => ', args);
        return userHelper.login(args.user.email, args.user.password);
      }
    },
    createPost: {
      type: PostType,
      args: {
        post: {
          type: new GraphQLNonNull(CreatePostInput)
        }
      },
      resolve: async (root, args) => {
        return (new Post(args.post)).save();
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

module.exports = {
  schema
};