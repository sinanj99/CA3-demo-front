import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState({ msg: "Fetching" });

  useEffect(() => {
    facade.fetchData().then(res => {
      setDataFromServer(res);
      console.log(res);
    });
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer.msg}</h3>
    </div>
  );
}
export default LoggedIn;
