import {userApi} from '../config/api/userApi';

export const deleteUser = async (uuid) => {
    try {
      const url = `/delete`;
      const body = {
        "token":"aaaaaaaa-1234-1234-cc12-a1a1a1a1a1a1",
        "uuid":uuid
    }

    const {data} = await userApi.post(url,body);
      return data;
  
    } catch (error) {
      return error;
    }
  };