import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import passwordGenerator from 'password-generator';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  createPassword() {
    return passwordGenerator(12, false);
  }
}
