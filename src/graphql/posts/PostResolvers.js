import PostModel from './PostModel';
import UserModel from '../user/UserModel';
import type { PostType, PostConnection } from './PostTypes';
import type { Context } from '../TypeDefinitions';

type FindOnePost = {
  id: string,
};

type ConnectionArgs = {
  search: string,
  after: string,
  first: number,
};

type PostArgs = {
  title: string,
  description: string,
};

const resolvers: Object = {
  Post: {
    user: async ({ user }: PostType) => await UserModel.findOne({ _id: user }),
  },
  post: async (obj: PostType, args: FindOnePost, context: Context): Promise<?PostType> => {
    const { id } = args;
    const { user } = context;

    if (!user) {
      throw new Error('Unauthenticated');
    }

    const post = await PostModel.findOne({ _id: id });
    return post;
  },
  postAdd: async (obj: PostType, args: PostArgs, context: Context): Promise<?PostType> => {
    const { title, description } = args;
    const { user } = context;

    if (!user) {
      throw new Error('Unauthenticated');
    }

    const post = new PostModel({
      title,
      description,
      user: user._id,
    });

    await post.save();

    const { _id } = post;

    return await PostModel.findOne({ _id });
  },
  userPosts: async (args: ConnectionArgs, userId: string): PostConnection => {
    const { search, after, first } = args;

    if (!userId) {
      throw new Error('NotFound');
    }

    const where = search
      ? {
        user: userId,
        title: {
          $regex: new RegExp(`^${search}^`, 'ig'),
        },
      }
      : {
        user: userId,
      };

    const posts = !after
      ? PostModel.find(where).limit(first)
      : PostModel.find(where)
        .skip(after)
        .limit(first);

    return {
      count: PostModel.count(),
      posts,
    };
  },
  posts: async (obj: PostType, args: ConnectionArgs, context: Context): PostConnection => {
    const { search, after, first } = args;
    const { user } = context;

    if (!user) {
      throw new Error('Unauthenticated');
    }

    const where = search
      ? {
        title: {
          $regex: new RegExp(`^${search}^`, 'ig'),
        },
      }
      : {};

    const posts = !after
      ? PostModel.find(where).limit(first)
      : PostModel.find(where)
        .skip(after)
        .limit(first);

    return {
      count: PostModel.count(),
      posts,
    };
  },
};

export default resolvers;
