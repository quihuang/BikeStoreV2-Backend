import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import passwordGenerator from 'password-generator';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { Workers } from '../models';

@injectable({ scope: BindingScope.TRANSIENT })
export class AuthenticationService {
  private secretkey: string;

  constructor(/* Add @inject to inject parameters */) {
    this.secretkey = String(process.env.SECRET_KEY);
  }

  generarPassword() {
    return passwordGenerator(12, false);
  }

  encriptar(password: string) {
    let encryptedData = CryptoJS.AES.encrypt(password, this.secretkey).toString();
    return encryptedData;
  }

  encriptarObjeto(data: any) {
    let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretkey).toString();
    return encryptedData;
  }

  desencriptar(password: string) {
    let bytes = CryptoJS.AES.decrypt(password, this.secretkey);
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  desencriptarObjeto(data: string) {
    let bytes = CryptoJS.AES.decrypt(data, this.secretkey);
    let encryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return encryptedData;
  }


  generateTokenJWT(worker: Workers) {
    let token = jwt.sign({
      name: worker.name,
      lastName: worker.lastName,
      id: worker.id
    }, this.secretkey, { expiresIn: 60 }
    );
    return token;
  }

  generateTokenJWTObject(worker: Workers) {
    let datos = {
      name: worker.name,
      lastName: worker.lastName,
      id: worker.id
    }

    let minutes = 5
    let token = jwt.sign({
      data: this.encriptarObjeto(datos)
    }, this.secretkey, { expiresIn: 60 * minutes }
    );
    return token;
  }

  validateTokenJWT(token: string) {
    try {
      let valido = jwt.verify(token, this.secretkey)
      return valido;
    }
    catch {
      return false;
    }
  }
}
