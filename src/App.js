import React, { useState, useEffect } from "react";
import "./App.css";
import SortFilter from "./Components/SortFilter";
import Logo from "./logo.png";

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
        <img className="header" src={Logo} alt="Lucky 7" />

        <p>
          This list shows all accounts created on Lucky 7. You have the
          possibility to sort the list or filter it by postal code. It's also
          possible to delete a user or edit the information showed.
        </p>
      </div>

      <SortFilter users={users} />
    </div>
  );
}

export default App;
