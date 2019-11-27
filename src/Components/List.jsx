import React from "react";
import User from "./User";

export default function List(props) {
  return (
    <section className="list">
      {props.users.map(user => {
        return (
          <User
            key={user._id}
            firstname={user.firstname}
            lastname={user.lastname}
            email={user.email}
            tel={user.tel}
            postcode={user.postcode}
          />
        );
      })}
    </section>
  );
}
