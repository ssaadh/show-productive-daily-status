// Package imports
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Lib imports
import {
  auth, 
  logout 
} from 'oauth2-redux';

class Auth extends React.Component {
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
      <button 
        disabled={ loggingIn } 
        onClick={ !loggingIn ? this.handleClick : null }
      >
        { !loggingIn ? `Authenticate with ${ this.capitalize( this.props.name ) }` : 'Logging in...' }
      </button> }
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

Auth.propTypes = {
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
    logout: ( id ) => dispatch( logout( id ) ), 
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Auth );
