import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { isSignedIn } from "../utils";
import { useRouter } from "next/router";

const AddPostPage = () => {
  const {push} = useRouter();
  let router = useRouter();
  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: [],
  });

  useEffect(() => {
    if (!isSignedIn()) {
      router.push("/login");
    }
  }, []);

  const handleInputChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage["token"]}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(post);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(process.env.baseIp + "/posts/add-post", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        push("/");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="add-post-page">
      <h2 className="dark-blue">Write a new Post</h2>
      <Stack
        component={"form"}
        autoComplete={"off"}
        className="add-post-form"
        sx={{ "& .MuiTextField-root": { m: 3 } }}
        onSubmit={handleSubmit}
      >
        <TextField
          type={"text"}
          label={"Post Title"}
          variant={"standard"}
          name={"title"}
          placeholder={"Enter the title of the post"}
          value={post.title}
          onChange={handleInputChange}
          required
        />
        <TextField
          type={"text"}
          label={"Post Content"}
          variant={"outlined"}
          name={"content"}
          multiline
          placeholder={"Enter the content of the post"}
          rows={15}
          value={post.content}
          onChange={handleInputChange}
          required
        />
        <Button variant={"contained"} type={"submit"}>
          Publish Post
        </Button>
      </Stack>
    </div>
  );
};

export default AddPostPage;
