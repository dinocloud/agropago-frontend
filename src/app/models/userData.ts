export class UserData {
  credentials: any = {
    email: '',
    password: ''
  };

  constructor() {
  }

  setCredentials(credentials) {
    this.credentials.email = credentials.email;
    this.credentials.password = credentials.password;
  }

  getCredentials(): string {
    return this.credentials;
  }

  getEmail(): string {
    return this.credentials.email;
  }
}
