import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Post from "../components/Post";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState({});

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage["token"]}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(process.env.baseIp + `/posts/post-${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setPost(result);
      })
      .catch((error) => {
        console.log("error", error);
        if (id) {
          router.push("/");
        }
      });
  }, [id]);

  return (
    <>
      <Nav />
      <Post post={post} />
      <Footer />
    </>
  );
};

export default PostPage;
