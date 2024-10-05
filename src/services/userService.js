import axios from "axios";
import { setValue, getValue } from "./localStorage";

export class UserService {
  url = "";
  token = null;
  constructor() {
    this.url = `${import.meta.env.VITE_API_HOST_URL}${
      import.meta.env.VITE_API_DEFAULT_PATH
    }/user`;
    this.token = getValue("auth-token");
  }

  async userSignup(userDetails) {
    try {
      const response = await fetch(this.url + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userDetails }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      responseData.data.token &&
        setValue("auth-token", responseData.data.token);

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async userLogin(cradentials) {
    try {
      const response = await fetch(this.url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: cradentials }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      responseData.data.token &&
        setValue("auth-token", responseData.data.token);

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      // const token = localStorage.getItem('auth-token');
      if (!this.token) {
        throw new Error("No token found");
      }
      const response = await axios.get(this.url + "/getuserprofile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
      });
      const responseData = response.data;
      // if(!response.ok){
      //   throw new Error(responseData.message);
      // }
      return responseData;
    } catch (error) {
      console.log(error);
      // return null;
      throw error;
    }
  }

  async changePassword(data) {
    try {
      if (!this.token) {
        throw new Error("No token found");
      }

      const response = await fetch(this.url + "/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
        body: JSON.stringify({ data }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(data) {
    try {
      if (!this.token) {
        throw new Error("No token found");
      }

      const response = await fetch(this.url + "/updateprofile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
        body: JSON.stringify({ data }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData;
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;
