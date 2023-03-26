import { useEffect } from "react";
import { useState } from "react";
import Post from "./Post";

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage["token"]}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(process.env.baseIp + "/posts/all", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setPosts(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <Post post={post} />
        )
      })}
    </div>
  );
};

export default PostsList;
