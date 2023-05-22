export default class RefreshTokenModel {
  constructor(token) {
    this.token = token;
    this.formData = new URLSearchParams();
  }

  setFormData() {
    this.formData.append('client_id', process.env.IDENTITY_API_CLIENT_ID);
    this.formData.append('grant_type', process.env.IDENTITY_TOKEN_GRANT_TYPE);
    this.formData.append('client_secret', process.env.IDENTITY_API_CLIENT_SECRET);
    this.formData.append('refresh_token', this.token);
    return this.formData.toString();
  }
}

export const setRefreshToken = (token) => new RefreshTokenModel(token).setFormData();
