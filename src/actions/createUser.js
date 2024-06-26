import {userApi} from '../config/api/userApi';

export const createUser = async (fullName,email,address,birthdate) => {
    try {
      const url = `/create`;
      const body = {
        "token":"aaaaaaaa-1234-1234-cc12-a1a1a1a1a1a1",
        "fullname":fullName,
        "email":email,
        "address":address,
        "birthdate":birthdate
      }
      
      const {data} = await userApi.post(url,body);
      return data;
  
    } catch (error) {
      return error;
    }
  };