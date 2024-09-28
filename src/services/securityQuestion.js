export class SecurityQuestionService {
  url = "";
  token = null;
  constructor() {
    this.url = "http://localhost:5001/api/v1/question/"; // TODO assign from .env file
    // this.token = getValue('auth-token');
  }

  async getSecurityQuestions() {
    try {
      const response = await fetch(this.url + "fetch-questions", {
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
const securityQuestion = new SecurityQuestionService();
export default securityQuestion;
