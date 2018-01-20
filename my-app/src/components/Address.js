import React, { Component, PropTypes } from 'react';

export default class Address extends Component {
  render() {
    const { address } = this.props;
    const { name } = address[0].name;

    return (
      <div className="Address">
        <h3>{name}</h3>
      </div>
    );
  }
}
