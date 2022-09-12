import axios, { AxiosResponse } from 'axios';

class MealApi {
  private httpRequest = axios.create({
    baseURL: 'http://direct.saintdev.kr:8444/meal',
  });

  getMenu(year: number, month: number, day: number): Promise<AxiosResponse> {
    return this.httpRequest.get(`/${year}/${month}/${day}`);
  }
}

export default new MealApi();