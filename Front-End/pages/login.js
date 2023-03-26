import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";

const RegisterPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [msg1, setMsg1] = useState("");
  const [msg2, setMsg2] = useState("");

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(loginData);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(process.env.baseIp + "/auth/login", requestOptions)
      .then((response) => {
        if (response.status == 200) {
          return response.text();
        } else {
          setMsg1("");
          setMsg2("Email Already Exists");
        }
      })
      .then((result) => {
        const token = JSON.parse(result).token;
        localStorage["token"] = token;
        setMsg2("");
        setMsg1("Logged In Successfully");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="login-page">
      <h2 className="dark-blue">Log In to your account</h2>
      <Stack
        component={"form"}
        sx={{
          "& .MuiTextField-root": { m: 2 },
        }}
        autoComplete={"off"}
        className="login-form"
        onSubmit={handleSubmit}
      >
        <TextField
          type={"email"}
          label={"Email"}
          variant={"outlined"}
          name={"email"}
          value={loginData.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          type={"password"}
          label={"Password"}
          variant={"outlined"}
          name={"password"}
          value={loginData.password}
          onChange={handleInputChange}
          required
        />
        <Button variant={"contained"} type="submit">
          Log In
        </Button>
      </Stack>
      <p className="text-success">{msg1}</p>
      <p className="text-danger">{msg2}</p>
    </div>
  );
};

export default RegisterPage;
