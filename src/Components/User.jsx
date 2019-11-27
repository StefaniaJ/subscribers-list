import React from "react";

export default function User(props) {
  return (
    <article className="user-section">
      <h1 className="fullname">{props.firstname + " " + props.lastname}</h1>
      <p className="email">{props.email}</p>
      <p className="tel">{props.tel}</p>
      <p className="postcode">{props.postcode}</p>
    </article>
  );
}
