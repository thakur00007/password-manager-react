import * as CryptoJS from "crypto-js";
class CryptoService {
  secretKey = "";
  constructor() {
    this.secretKey = import.meta.env.VITE_CRYPTO_KEY;
  }
  encrypt(plainText) {
    const cipherText = CryptoJS.AES.encrypt(
      plainText,
      this.secretKey
    ).toString();
    return cipherText;
  }
  decrypt(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
  }
}
export default CryptoService;
