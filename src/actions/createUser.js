import {userApi} from '../config/api/userApi';

export const createUser = async (fullName,email,address,birthdate) => {
    try {
      const url = `/create`;
      const body = {
        "token":"aaaaaaaa-1234-1234-cc12-a1a1a1a1a1a1",
        "fullname":fullName,
        "email":email,
        "address":address,
        "birthdate":"2000-01-01"
    }
      
    const {data} = await userApi.post(url,body);
    return data;
  
    } catch (error) {
      console.log(error);
      throw new Error('Error create users');
    }
  };