import axios, { AxiosResponse } from 'axios';

class MealApi {
  private httpRequest = axios.create({
    baseURL: 'https://kuulartkoc.execute-api.us-east-1.amazonaws.com/',
  });

  getMenu(year: number, month: number, day: number): Promise<AxiosResponse> {
    return this.httpRequest.get(`/?year=${year}&month=${month}&day=${day}`);
  }
}

export default new MealApi();