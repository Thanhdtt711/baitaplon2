import HttpClient from "../Api/HttpClient";
export default class Options {
  constructor() {
    this.client = new HttpClient();
  }

  get = async (key = null) => {
    const response = await this.client.get(this.client.options);
    if (response.response.ok) {
      const options = response.data;
      if (key !== null) {
        return options[key];
      }

      return options;
    }

    return null;
  };
}
