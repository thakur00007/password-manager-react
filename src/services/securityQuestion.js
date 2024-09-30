export class SecurityQuestionService {
  url = "";
  token = null;
  constructor() {
    this.url = `${import.meta.env.VITE_API_HOST_URL}${
      import.meta.env.VITE_API_DEFAULT_PATH
    }/question`;
    // this.token = getValue('auth-token');
  }

  async getSecurityQuestions() {
    try {
      const response = await fetch(this.url + "/fetch-questions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData.data.questions;
    } catch (error) {
      throw error;
    }
  }
}
export default SecurityQuestionService;
