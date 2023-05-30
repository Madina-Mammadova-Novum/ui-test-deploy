class LoginModel {
  constructor(credentials) {
    this.credentials = credentials;
    this.formData = new URLSearchParams();
  }

  setFormData() {
    this.formData.append('grant_type', process.env.IDENTITY_API_GRANT_TYPE);
    this.formData.append('client_id', process.env.IDENTITY_API_CLIENT_ID);
    this.formData.append('client_secret', process.env.IDENTITY_API_CLIENT_SECRET);
    this.formData.append('username', this.credentials.email);
    this.formData.append('password', this.credentials.password);
    return this.formData.toString();
  }
}

export const setLogin = ({ email, password }) => new LoginModel({ email, password }).setFormData();
