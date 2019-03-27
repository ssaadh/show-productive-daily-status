import { MAKERLOG_SUBMIT } from './actionTypes';
import Axios from 'axios';

const post = ( token, data ) => {
  const postData = {
    done: false, 
    in_progress: false, 
    content: data.content 
  };
  postData.done = data.theStatus === 'done' ? true : false;
  postData.in_progress = data.theStatus === 'doing' ? true : false;

  const headerHash = { header: `Authorization: Bearer ${ token }` };
  Axios.post(
    'https://api.getmakerlog.com/tasks/', 
    data, 
    { headers: headerHash } 
  );
}

const mlPost = ( token, data ) => ( {
  type: MAKERLOG_SUBMIT, 
  payload: post( token, data )
} );

export { mlPost };
