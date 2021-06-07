import { DataService } from "../service/data.service";
import { Column } from "../share/table/column";

export class Utils {
  private static validation: Map<string, Function> = new Map<string, Function>();

  static checkStudentLogin(http: DataService, tokenKey: string = 'auokkastudenttoken') {
    return http.get('../api/login/isStudentLogin', tokenKey);
  }

  static nullOrEmpty(value: string): boolean {
    return value == null && value == '';
  }

  static verify(value: any, type: string): boolean {
    let validation: Map<string, Function> = new Map<string, Function>();
    validation['required'] = (value):boolean => {
      return value != null && value != '';
    }
    var result = validation[type](value);
    return result
  }

  static sort(model, column: Column) {
    if (column.sortOrder == Column.ASCENDING) {
      model = model.sort((a, b) => {
        if (Utils.getData(a, column) > Utils.getData(b, column)) {
          return 1;
        }
        else {
          return -1
        }

      });
      column.sortOrder = Column.DESCENDING;
    }
    else {
      model = model.sort((a, b) => {
        if (Utils.getData(a, column) < Utils.getData(b, column)) {
          return 1;
        }
        else {
          return -1
        }

      });
      column.sortOrder = Column.ASCENDING;
    }
    return model;
  }

  static getData(model, column: Column) {
    var data = model;
    for (let a of column.attribute) {
      data = data[a];
    }
    return data;
  }
}
