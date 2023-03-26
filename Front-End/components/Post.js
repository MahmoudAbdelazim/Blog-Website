const Post = ({post}) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.firstName} {post.lastName} </p>
      <p>{post.publishedDate} </p>
      <p>{post.content}
      </p>
      <ul>
        {post.tags.map((tag) => {
          return (
            <li>{tag}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default Post;