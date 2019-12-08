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
      <div className="intro">
        <h1>Some stuff</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta,
          erat id sodales iaculis, ante arcu iaculis mauris, et tincidunt dui
          risus ac dolor. Duis dui ex, gravida ut risus et, semper placerat
          nisl. In tempus varius massa, a tincidunt eros consequat id.
        </p>
      </div>

      <SortFilter users={users} />
    </div>
  );
}

export default App;
