import React, { useState } from "react";
function LogIn(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const login = evt => {
    evt.preventDefault();
    props.login(user.username, user.password);
  };
  const onChange = evt => {
    user[evt.target.id] = evt.target.value;
    setUser({ ...user });
  };
  return (
    <div className="wrapper">
      <form onSubmit={login} onChange={onChange}>
        <h1>Login</h1>
        <input placeholder="User Name" id="username" /><br />
        <input placeholder="Password" id="password" /><br />
        <button>Login</button>
      </form>
    </div>
  );
}
export default LogIn;
