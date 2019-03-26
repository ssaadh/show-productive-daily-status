// Package imports
import React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

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

  capitalize( str ) {
    return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
  }

  handleClick() {
    this.props.auth( this.props.name, this.props.config );
  }

  handleLogout() {
    this.props.logout( this.props.name );
  }

  render() {
    const { loggingIn, loggedIn } = this.props.api;
    return(
    <div>
      { !loggedIn && 
      <Button 
        disabled={ loggingIn } 
        onClick={ !loggingIn ? this.handleClick : null }
      >
        { !loggingIn ? `Authenticate with ${ this.capitalize( this.props.name ) }` : 'Logging in...' }
      </Button> }
      { loggedIn && 
      <Button 
        disabled={ !loggedIn }
        onClick={ loggedIn ? this.handleLogout : null }
      >
        { `Disconnect from ${ this.capitalize( this.props.name ) }` }
      </Button> }
    </div>
    );
  }
}

Makerlog.propTypes = {
  name: PropTypes.string.isRequired, 
  api: PropTypes.object.isRequired, 
  config: PropTypes.object.isRequired, 
  auth: PropTypes.func.isRequired, 
  logout: PropTypes.func.isRequired 
};

function mapStateToProps( state, ownProps ) {
  return {
    name: ownProps.name, 
    api: state[ `oauth/${ ownProps.name }` ], 
    config: ownProps.config 
  };
}

function mapDispatchToProps( dispatch ) {
  return {
      auth( id, config ) {
        dispatch( auth( id, config ) )
      }, 
      logout() {
        dispatch( logout )
      }
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Makerlog );
