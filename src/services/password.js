import { getValue } from "./localStorage";
export class PasswordService {
  url = "";
  token = null;
  constructor() {
    this.url = `${import.meta.env.VITE_API_HOST_URL}${import.meta.env.VITE_API_DEFAULT_PATH}/password`; // TODO assign from .env file
    this.token = getValue('auth-token');
  }

  async savePassword(data) {
    try {
      const response = await fetch(this.url + "/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+this.token
        },
        body: JSON.stringify({ data }),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async fetchAllPasswords() {
    try {
      const response = await fetch(this.url + "/fetchall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+this.token
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log(responseData);
      return responseData.data;

    } catch (error) {
      throw error;
    }
  }

  async showPassword(data) {
    try {
      const response = await fetch(this.url + "/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+this.token
        },
        body: JSON.stringify({ data }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log(responseData);

      return responseData.data;
    } catch (error) {
      throw error;
    }
  }

}

const passwordService = new PasswordService();
export default passwordService;