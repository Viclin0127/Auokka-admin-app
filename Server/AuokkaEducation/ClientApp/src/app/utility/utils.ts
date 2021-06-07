import { DataService } from "../service/data.service";

export class Utils {
  static checkStudentLogin(http: DataService, tokenKey: string = 'auokkastudenttoken') {
    return http.get('../api/login/isStudentLogin', tokenKey);
  }
}
