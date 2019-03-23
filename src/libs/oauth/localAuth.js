class localAuth {  
  static saveAll( identifier, info ) {
    if ( identifier ) {      
      localStorage.setItem( identifier, JSON.stringify( info ) );
      return true;
    } else {
      return false;
    }
  }

  // Check/Get access token if there and not expired
  static validToken( identifier ) {
    const all = localAuth.getAll( identifier );
    if ( !all ) {
      return false;
    }
    if ( !all.expires_at || !all.access_token ) {
      return false;
    }

    // If not expired
    if ( Number( all.expires_at ) > Date.now() ) {
      return all.access_token;
    }

    return false;
  }

  static getAll( identifier ) {
    JSON.parse( localStorage.getItem( identifier ) );
  }

  static get( identifier, item ) {
    const all = localAuth.getAll( identifier );
    if ( all ) {
      return all[ 'item' ];
    }
  }

  static getToken( identifier ) {    
    const all = localAuth.getAll( identifier );
    return all.access_token;
  }

  static removeAll( identifier ) {
    localStorage.removeItem( identifier );
  }
}

export default localAuth;