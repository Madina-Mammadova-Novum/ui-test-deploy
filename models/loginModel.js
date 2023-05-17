export default class LoginModel {
  constructor(credentials) {
    this.credentials = credentials;
    this.formData = new URLSearchParams();
  }

  addFields() {
    this.formData.append('grant_type', 'password');
    this.formData.append('client_id', 'shiplink-api');
    this.formData.append('client_secret', '49C1A7E1-0C79-4A7889-Ay3D6-0997998FB86B0');
    this.formData.append('username', this.credentials.email);
    this.formData.append('password', this.credentials.password);
  }
}
