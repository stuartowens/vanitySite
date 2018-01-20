import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadAddresses } from '../actions';

import Address from '../components/Address';

class AddressPage extends Component {
  constructor(props) {
    super(props);
    this.renderAddress = this.renderAddress.bind(this);
  }

  componentWillMount() {
    this.props.loadAddressPage(this.props.name);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.props.loadAddressPage(nextProps.name);
    }
  }

  renderAddress(address) {
    return <Address address={address} />;
  }

  render() {
    const { address } = this.props;
    if (!address) {
      return (
        <h1>
          <i>Loading {address} details...</i>
        </h1>
      );
    }
    return (
      <div>
        <h1>Address Page</h1>
        <Address address={address} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { entities: { addresses } } = state;
  return {
    addresses: addresses,
    address: addresses,
  };
}

export default connect(mapStateToProps, {
  loadAddresses,
})(AddressPage);
