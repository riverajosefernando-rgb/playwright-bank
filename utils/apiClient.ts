export class ApiClient {

  async login(request: any, email: string, password: string) {
    return await request.post('https://reqres.in/api/login', {
      data: { email, password }
    });
  }

}