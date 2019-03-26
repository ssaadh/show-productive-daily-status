// Package imports
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/Button';

// Lib imports
import serviceConfig from '../config/makerlog';

// Lib imports
import {
  auth, 
  logout 
} from '../libs/oauth';

class Makerlog extends React.Component {
  constructor( props ) {
    super( props );

    this.handleClick = this.handleClick.bind( this );
    this.handleLogout = this.handleLogout.bind( this );
  }
  name = 'makerlog';
  config = serviceConfig;

  handleClick() {
    this.props.actions.auth( this.name, this.config );
  }

  handleLogout() {
    this.props.actions.logout( this.name );
  }

  render() {
    console.log( this.props );
    const isLoading = this.props.makerlog.loggingIn;
    const loggedIn = this.props.makerlog.loggedIn;
    return(
    <div>
      { !this.props.makerlog.LoggedIn && 
      <Button 
        disabled={ isLoading } 
        onClick={ !isLoading ? this.handleClick : null }
      >
        { !isLoading ? `Authenticate with ${ this.name }` : 'Logging in...' }
      </Button> }
      { this.props.makerlog.LoggedIn && 
      <Button 
        disabled={ !loggedIn }
        onClick={ loggedIn ? this.handleLogout : null }
      >
        { loggedIn ? `Disconnect us from ${ this.name }` : 'Logging out...' }
      </Button> }
    </div>
    );
  }
}

Makerlog.propTypes = {
  makerlog: PropTypes.object.isRequired, 
  actions: PropTypes.object.isRequired 
};

function mapStateToProps( state, ownProps ) {
  return {
    makerlog: state[ 'oauth/makerlog' ] 
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    actions: bindActionCreators( { auth, logout }, dispatch )
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Makerlog );
