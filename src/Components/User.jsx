import React, { Component } from "react";
import Delete from "./xwhite.png";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      id: this.props.id,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      email: this.props.email,
      tel: this.props.tel,
      postcode: this.props.postcode
    };
    this.editUser = this.editUser.bind(this);
    this.changeFirstName = this.changeFirstName.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeTel = this.changeTel.bind(this);
    this.changePost = this.changePost.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  editUser() {
    this.setState({ edit: true });
  }

  changeFirstName(e) {
    this.setState({ firstname: e.target.value });
  }

  changeLastName(e) {
    this.setState({ lastname: e.target.value });
  }

  changeEmail(e) {
    this.setState({ email: e.target.value });
  }

  changeTel(e) {
    this.setState({ tel: e.target.value });
  }

  changePost(e) {
    this.setState({ postcode: e.target.value });
  }

  handleSubmit() {
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      tel: this.state.tel,
      postcode: this.state.postcode
    };

    const postData = JSON.stringify(data);
    fetch(
      "https://kea3rdsemester-91fd.restdb.io/rest/subscribers/" + this.state.id,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": "5d887df9fd86cb75861e2626",
          "cache-control": "no-cache"
        },
        body: postData
      }
    )
      .then(res => res.json())
      .then(this.setState({ edit: false }));
  }

  handleDelete(e) {
    fetch(
      "https://kea3rdsemester-91fd.restdb.io/rest/subscribers/" +
        e.target.dataset.id,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": "5d887df9fd86cb75861e2626",
          "cache-control": "no-cache"
        }
      }
    )
      .then(res => res.json())
      .then(this.setState({ edit: false }));
  }

  render() {
    const edit = this.state.edit;
    if (edit) {
      return (
        <article className="user-section user-input">
          <div className="fullname">
            <input
              type="text"
              value={this.state.firstname}
              onChange={this.changeFirstName}
            />
            <input
              type="text"
              value={this.state.lastname}
              onChange={this.changeLastName}
            />
          </div>

          <input
            className="email"
            type="text"
            value={this.state.email}
            onChange={this.changeEmail}
          />
          <input
            className="tel"
            type="text"
            value={this.state.tel}
            onChange={this.changeTel}
          />
          <input
            className="postcode"
            type="text"
            value={this.state.postcode}
            onChange={this.changePost}
          />
          <button onClick={this.handleSubmit}>Save</button>
        </article>
      );
    }
    return (
      <article className="user-section">
        <p className="fullname">
          {this.state.firstname + " " + this.state.lastname}
        </p>
        <p className="email">{this.state.email}</p>
        <p className="tel">{this.state.tel}</p>
        <p className="postcode">{this.state.postcode}</p>
        <button onClick={this.editUser}>Edit</button>
        <img
          className="delete"
          onClick={this.handleDelete}
          src={Delete}
          alt="Delete"
          data-id={this.state.id}
        />
      </article>
    );
  }
}

export default User;
