import React from "react";
import User from "./User";
import Table from "react-bootstrap/Table";

export default function List(props) {
  return (
    <Table responsive borderless className="list">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone nr</th>
          <th>Postal Code</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => {
          return (
            <User
              key={user._id}
              firstname={user.firstname}
              lastname={user.lastname}
              email={user.email}
              tel={user.tel}
              postcode={user.postcode}
              id={user._id}
            />
          );
        })}
      </tbody>
    </Table>
  );
}
