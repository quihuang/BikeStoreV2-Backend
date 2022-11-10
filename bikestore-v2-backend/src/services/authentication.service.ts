import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import passwordGenerator from 'password-generator';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import {Workers} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  private secretKey = String(process.env.SECRET_KEY);

  constructor(/* Add @inject to inject parameters */) {}

  createPassword() {
    return passwordGenerator(12, false);
  }

  encryptPassword(password: string) {
    let encryptedData = CryptoJS.AES.encrypt(
      password,
      this.secretKey,
    ).toString();
    return encryptedData;
  }

  encryptObject(data: any) {
    let encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.secretKey,
    ).toString();
    return encryptedData;
  }

  decryptPassword(password: string) {
    let bytes = CryptoJS.AES.decrypt(password, this.secretKey);
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  decryptObject(data: string) {
    let bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    let encryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return encryptedData;
  }

  generateTokenJWT(worker: Workers) {
    let token = jwt.sign(
      {
        name: worker.name,
        lastName: worker.lastName,
        id: worker.id,
      },
      this.secretKey,
      {expiresIn: '1h'},
    );
    return token;
  }

  generateTokenJWTObject(worker: Workers) {
    let datos = {
      name: worker.name,
      lastName: worker.lastName,
      id: worker.id,
    };

    let token = jwt.sign(
      {
        data: this.encryptObject(datos),
      },
      this.secretKey,
      {expiresIn: '1h'},
    );
    return token;
  }

  validateTokenJWT(token: string) {
    try {
      let valid = jwt.verify(token, this.secretKey);
      return valid;
    } catch {
      return false;
    }
  }
}
