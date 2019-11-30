import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import List from "./List";

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = { sortby: "firstname" };
  }

  handleClick = e => {
    this.setState({
      sortby: e.target.dataset.sort
    });
  };

  render() {
    let arraySort = require("array-sort");
    let newList = arraySort(this.props.users, this.state.sortby);

    return (
      <>
        <DropdownButton id="dropdown-basic-button" title="Sort By">
          <Dropdown.Item onClick={this.handleClick} data-sort="firstname">
            First Name
          </Dropdown.Item>
          <Dropdown.Item onClick={this.handleClick} data-sort="lastname">
            Last Name
          </Dropdown.Item>
          <Dropdown.Item onClick={this.handleClick} data-sort="email">
            Email
          </Dropdown.Item>
          <Dropdown.Item onClick={this.handleClick} data-sort="postcode">
            Post Code
          </Dropdown.Item>
        </DropdownButton>

        <List users={newList} sortby={this.state.sortby} />
      </>
    );
  }
}

export default Sort;
