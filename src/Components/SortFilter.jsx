import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import List from "./List";

class SortFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortby: "firstname",
      postcodestart: 0,
      postcodeend: 10000
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = e => {
    this.setState({
      sortby: e.target.dataset.sort
    });
  };

  handleFilter(e) {
    this.setState({
      postcodestart: e.target.dataset.start,
      postcodeend: e.target.dataset.end
    });
  }

  render() {
    const start = this.state.postcodestart;
    const end = this.state.postcodeend;

    let arraySort = require("array-sort");
    let newList = arraySort(this.props.users, this.state.sortby);

    let filter = require("array.filter");
    let filterby = function(x) {
      return x.postcode >= start && x.postcode <= end;
    };

    newList = filter(filterby, newList);

    return (
      <>
        <div className="buttons">
          <DropdownButton
            className="dropdown-btn"
            id="dropdown-basic-button"
            title="Sort By"
          >
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

          <DropdownButton
            className="dropdown-btn"
            id="dropdown-basic-button"
            title="Filter Postal Code"
          >
            <Dropdown.Item
              onClick={this.handleFilter}
              data-start="0"
              data-end="10000"
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              onClick={this.handleFilter}
              data-start="1000"
              data-end="1473"
            >
              1000 - 1473
            </Dropdown.Item>
            <Dropdown.Item
              onClick={this.handleFilter}
              data-start="1500"
              data-end="1799"
            >
              1500 - 1799
            </Dropdown.Item>
            <Dropdown.Item
              onClick={this.handleFilter}
              data-start="1800"
              data-end="2000"
            >
              1800- 2000
            </Dropdown.Item>
            <Dropdown.Item
              onClick={this.handleFilter}
              data-start="2100"
              data-end="2199"
            >
              2100
            </Dropdown.Item>
          </DropdownButton>
        </div>

        <List users={newList} />
      </>
    );
  }
}

export default SortFilter;
