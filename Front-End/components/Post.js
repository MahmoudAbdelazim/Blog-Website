const Post = ({ post }) => {
  return (
    <div className="post">
      <h3 className="post-title dark-blue">{post.title}</h3>
      <p className="post-author">
        {post.authorFirstName} {post.authorLastName}{" "}
      </p>
      <p className="post-date">
        {new Date(post.publishedDate).toLocaleDateString()}{" "}
      </p>
      <p className="post-content">{post.content}</p>
      <ul className="post-tags">
        {post.tags?.map((tag) => {
          return <li>{tag}</li>;
        })}
      </ul>
    </div>
  );
};

export default Post;