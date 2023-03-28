import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';

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
      <p className="likes">
        <FavoriteBorderIcon /> {post.likes}
      </p>
      <p className="comments">
        <CommentIcon /> {(!post.comments ? "0" : post.comments.length)}
      </p>
      <ul className="post-tags">
        {post.tags?.map((tag) => {
          return <li>{tag}</li>;
        })}
      </ul>
      <p className="post-content">{post.content}</p>
    </div>
  );
};

export default Post;
