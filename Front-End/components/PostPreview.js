import Link from "next/link";

const PostPreview = ({ post }) => {

  return (
    <Link href={{pathname: `/post`, query: {id: post.id}}} className="post-preview-link">
      <div className="post-preview">
        <h3 className="post-preview-title dark-blue">{post.title}</h3>
        <p className="post-preview-author">
          {post.authorFirstName} {post.authorLastName}{" "}
        </p>
        <p className="post-preview-date">
          {new Date(post.publishedDate).toLocaleDateString()}{" "}
        </p>
        <p className="post-preview-content">{post.content}</p>
        <ul className="post-preview-tags">
          {post.tags?.map((tag) => {
            return <li>{tag}</li>;
          })}
        </ul>
      </div>
    </Link>
  );
};

export default PostPreview;
