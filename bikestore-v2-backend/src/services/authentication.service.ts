import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import passwordGenerator from 'password-generator';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import {Workers} from '../models';
import {environment} from '../config/enviroment';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(/* Add @inject to inject parameters */) {}

  createPassword() {
    return passwordGenerator(12, false);
  }

  encryptPassword(password: string) {
    let encryptedData = CryptoJS.AES.encrypt(
      password,
      environment.secretKeyAES,
    ).toString();
    return encryptedData;
  }

  encryptObject(data: any) {
    let encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      environment.secretKeyAES,
    ).toString();
    return encryptedData;
  }

  decryptPassword(password: string) {
    let bytes = CryptoJS.AES.decrypt(password, environment.secretKeyAES);
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  decryptObject(data: string) {
    let bytes = CryptoJS.AES.decrypt(data, environment.secretKeyAES);
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
      environment.secretKeyAES,
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
      environment.secretKeyAES,
      {expiresIn: '1h'},
    );
    return token;
  }

  validateTokenJWT(token: string) {
    try {
      let valid = jwt.verify(token, environment.secretKeyAES);
      return valid;
    } catch {
      return false;
    }
  }
}
