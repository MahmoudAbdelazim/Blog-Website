import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';

const Nav = () => {
  const { push } = useRouter();
  const handleLogout = (e) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage['token']}`
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(process.env.baseIp + "/auth/logout", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        localStorage.removeItem('token');
        push('/login');
      })
      .catch((error) => console.log("error", error));
  };

  const handleWritePost = () => {
    push("/add-post");
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        <h3 className="nav-title">Blog Website</h3>
        <div>
          <Button onClick={handleWritePost}>Write A Post</Button>
        </div>
      </div>
      <div className="nav-right">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </nav>
  );
};

export default Nav;
