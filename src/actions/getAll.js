import {userApi} from '../config/api/userApi';

export const getAll = async () => {
    try {
      const url = `/all?token=aaaaaaaa-1234-1234-cc12-a1a1a1a1a1a1`;
      const {data} = await userApi.get(url);
  
      return data.users;
  
    } catch (error) {
      console.log(error);
      throw new Error('Error getting users');
    }
  };
  