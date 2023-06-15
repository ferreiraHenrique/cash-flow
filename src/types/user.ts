import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  checkPassword: (password: string) => boolean
}

export class User implements IUser {
  id: string
  name: string
  email: string
  password: string

  constructor(data: any) {
    this.id = data.id || uuidv4()
    this.name = data.name
    this.email = data.email
    this.password = data.password
  }

  checkPassword(password: string): boolean {
    return this.password == btoa(password)
  }
}

export interface IRegisterUser {
  name: string
  email: string
  password: string
  register: () => IUser
}

export class RegisterUser implements IRegisterUser {
  name: string;
  email: string;
  password: string;

  constructor(data: any) {
    this.name = data.name
    this.email = data.email
    this.password = btoa(data.password)
  }

  register(): IUser {
    return new User(this)
  };
}
