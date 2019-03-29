import React from 'react';
// import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { mlPost } from '../actions';
import MakerLogSubmitForm from './MakerLogSubmitForm';

class MakerLogFront extends React.Component {

  render() {
    return( 
    <div>
        <MakerLogSubmitForm action={ this.props.mlPost } token={ this.props.token } submitting={ this.props.submitting } />
    </div>
    )
  }
}

function mapStateToProps( state, ownProps ) {
  return {
    token: state[ 'oauth/makerlog' ].access_token, 
    submitting: state.makerlogSubmit.isSubmitting 
  };
}

function mapDispatchToProps( dispatch ) {
  return {
      mlPost( token, data ) {
        dispatch( mlPost( token, data ) )
      }
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( MakerLogFront );
