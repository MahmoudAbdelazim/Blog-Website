import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import moment from 'moment';

const Post = ({ post }) => {
  return (
    <div className="post">
      <h3 className="post-title dark-blue">{post.title}</h3>
      <p className="post-author">
        {post.authorFirstName} {post.authorLastName}{" "}
      </p>
      <p className="post-date">
        {moment(post.publishedDate).format("LLL")}{" "}
      </p>
      <p className="likes">
        <FavoriteBorderIcon /> {post.likes}
      </p>
      <p className="commentsCount">
        <CommentIcon /> {(!post.comments ? "0" : post.comments.length)}
      </p>
      <ul className="post-tags">
        {post.tags?.map((tag) => {
          return <li key={tag}>{tag}</li>;
        })}
      </ul>
      <p className="post-content">{post.content}</p>
    </div>
  );
};

export default Post;
