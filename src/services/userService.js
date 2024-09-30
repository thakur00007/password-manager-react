import axios from "axios";
import { setValue, getValue } from "./localStorage";

export class UserService{

  url = '';
  token = null;
  constructor() {
    this.url = `${import.meta.env.VITE_API_HOST_URL}${import.meta.env.VITE_API_DEFAULT_PATH}/user`; // TODO assign from .env file
    this.token = getValue('auth-token');
  }

  async userSignup (userDetails) {
    try {
      const response = await fetch(this.url+'/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user:userDetails}),
      });

      const responseData = await response.json();

      if(!response.ok){
        throw new Error(responseData.message);
      }
            
      return responseData;
      
    } catch (error) {
      throw error;
    }
  }

  async userLogin (cradentials) {
    try {
      const response = await fetch(this.url+'/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user:cradentials}),
      });

      const responseData = await response.json();

      if(!response.ok){
        throw new Error(responseData.message);
      }
      setValue('auth-token', responseData.data.token);
      
      return responseData;
      
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser () {
    try {
      // const token = localStorage.getItem('auth-token');
      console.log(this.token);
      if(!this.token){
        console.log('No token found')
        throw new Error('No token found');
      }
      const response = await axios.get(this.url+'/getuserprofile', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this.token
        },
      });
      console.log(response)
      const responseData =  response.data;
      // if(!response.ok){
      //   throw new Error(responseData.message);
      // }
      return responseData.data.loggedInUser;
    } catch (error) {
      console.log(error);
      // return null;

      throw error;
    }
  }

}
const userService = new UserService();
export default userService;