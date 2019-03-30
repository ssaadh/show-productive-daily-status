class localAuth {
  static key( identifier ) {
    return `oauth/${ identifier.toLowerCase() }`;
  }
  static saveAll( identifier, info ) {
    if ( identifier ) {
      const key = localAuth.key( identifier );
      // Awful
      if ( !info.expires_at ) {
        info.expires_at = Date.now() + 50000000;
      }
      localStorage.setItem( key, JSON.stringify( info ) );
      return true;
    } else {
      return false;
    }
  }
  
  static getAll( identifier ) {
    const key = localAuth.key( identifier );
    return JSON.parse( localStorage.getItem( key ) );
  }

  static get( identifier, item ) {
    const all = localAuth.getAll( identifier );
    if ( all ) {
      return all[ 'item' ];
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


  static getToken( identifier ) {    
    const all = localAuth.getAll( identifier );
    return all.access_token;
  }

  static removeAll( identifier ) {
    const key = localAuth.key( identifier );
    localStorage.removeItem( key );
  }
}

export default localAuth;