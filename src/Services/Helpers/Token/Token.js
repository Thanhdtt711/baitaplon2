import config from "../../../Configs/Config.json";

export default class Token {
  constructor() {
    const { TOKEN_NAME } = config;
    this.tokenName = TOKEN_NAME;
  }

  setToken = (token) => {
    localStorage.setItem(this.tokenName, token);
  };

  getToken = () => {
    if (localStorage.getItem(this.tokenName)) {
      return localStorage.getItem(this.tokenName);
    }
  };

  removeToken = () => {
    localStorage.removeItem(this.tokenName);
  };
}
