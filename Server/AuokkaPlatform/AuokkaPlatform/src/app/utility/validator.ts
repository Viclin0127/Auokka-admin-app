export class Validator {

  form: any;
  modified: any = {};

  constructor(form: any) {
    this.form = form;
    Object.keys(form).forEach((key) => {
      this.modified[key] = false;
    });
  }

  modify(key:string, content: any) {
    this.form[key] = content;
    this.modified[key] = true;
  }

  getValue(key: string) {
    return this.form[key];
  }

  getForm() {
    return this.form;
  }

  touched(key) {
    return this.modified[key];
  }

  allModified() {
    Object.keys(this.form).forEach((key) => {
      this.modified[key] = true;
    });
  }
}
