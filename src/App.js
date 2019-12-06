import React, { useState, useEffect } from "react";
import "./App.css";
import SortFilter from "./Components/SortFilter";

function App() {
  //fetching the data and store it
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      "https://kea3rdsemester-91fd.restdb.io/rest/" +
        "subscribers?fetchchildren=true",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": "5d887df9fd86cb75861e2626",
          "cache-control": "no-cache"
        }
      }
    )
      .then(e => e.json())
      .then(e => setUsers(e));
  }, []);

  return (
    <div className="App">
      <SortFilter users={users} />
    </div>
  );
}

export default App;
