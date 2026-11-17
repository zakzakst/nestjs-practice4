export const PostDetailConverter = (
  post: JPComponents.Schemas.Post,
  user: JPComponents.Schemas.User,
): BFFComponents.Schemas.PostDetail => {
  return {
    id: post.id,
    userId: post.userId,
    title: post.title,
    body: post.body,
    username: user.username,
    email: user.email,
  };
};
