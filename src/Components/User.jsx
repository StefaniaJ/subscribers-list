import React, { Component } from "react";
import Delete from "./xwhite.png";
import Button from "react-bootstrap/Button";

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
      postcode: this.props.postcode,
      deleted: false
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
      .then(this.setState({ edit: false, deleted: true }));
  }

  render() {
    const edit = this.state.edit;
    const deleted = this.state.deleted;

    if (edit) {
      return (
        <tr className="user-input user-section">
          <td className="fullname">
            <input
              type="text"
              value={this.state.firstname}
              onChange={this.changeFirstName}
            />
          </td>
          <td>
            <input
              type="text"
              value={this.state.lastname}
              onChange={this.changeLastName}
            />
          </td>
          <td>
            <input
              className="email"
              type="text"
              value={this.state.email}
              onChange={this.changeEmail}
            />
          </td>

          <td>
            <input
              className="tel"
              type="text"
              value={this.state.tel}
              onChange={this.changeTel}
            />
          </td>

          <td>
            <input
              className="postcode"
              type="text"
              value={this.state.postcode}
              onChange={this.changePost}
            />
          </td>

          <td>
            <Button
              className="submit-btn"
              onClick={this.handleSubmit}
              variant="primary"
            >
              Save
            </Button>
          </td>
          <td>
            <img
              className="delete"
              onClick={this.handleDelete}
              src={Delete}
              alt="Delete"
              data-id={this.state.id}
            />
          </td>
        </tr>
      );
    } else if (!deleted) {
      return (
        <tr className="user-section">
          <td className="fullname">{this.state.firstname}</td>
          <td>{this.state.lastname}</td>
          <td className="email">{this.state.email}</td>
          <td className="tel">{this.state.tel}</td>
          <td className="postcode">{this.state.postcode}</td>
          <td>
            <Button
              className="edit-btn"
              onClick={this.editUser}
              variant="outline-primary"
            >
              Edit
            </Button>
          </td>
          <td>
            <img
              className="delete"
              onClick={this.handleDelete}
              src={Delete}
              alt="Delete"
              data-id={this.state.id}
            />
          </td>
        </tr>
      );
    } else {
      return null;
    }
  }
}

export default User;
