import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  validation: Map<string, Function> = new Map<string, Function>();
  validated: Map<string, boolean> = new Map<string, boolean>();

  message: Map<string, Function> = new Map<string, Function>();

  constructor() {
    this.validation['required'] = (value): boolean => {
      return value != null && value != '';
    }

    this.message['required'] = (valid, label): string => {
      return (!valid ? '' : label + ' is required');
    }

    this.validation['email'] = (value): boolean => {
      var regex = new RegExp("[a-z0-9!#$%&' * +/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
      return regex.test(value);
    }

    this.message['email'] = (valid): string => {
      return (!valid ? '' : 'The email format is incorrect');
    }
  }

  verify(value: any, label: string, type: string): boolean {
    var result = this.validation[type](value);
    this.validated[label] = result;
    return result
  }

  allValid(label: string[]) {
    for (let l of label) {
      if (!this.validated[l]) {
        return false;
      }
    }
    return true;
  }

}
