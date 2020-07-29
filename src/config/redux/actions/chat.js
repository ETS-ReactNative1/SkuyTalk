import axios from 'axios';
import {API_URL} from '@env';

export const getChats = (token) => {
  return {
    type: 'GETCHATS',
    payload: axios({
      method: 'GET',
      url: `${API_URL}/chat/private`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

// export const getChatById = token;
