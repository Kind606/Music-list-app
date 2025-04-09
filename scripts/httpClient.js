import { Settings } from './config/config.js';

// Module...

export default class HttpClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async get() {
    try {
      const uri = Settings.api_url + this.endpoint;
      const response = await fetch(uri);

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(
          `Det gick fel: ${response.status}, ${response.statusText}`
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}