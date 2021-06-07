export class Field {
  label: string
  title: string;
  type: string = 'text';
  value: any;
  bind: boolean;
  required: boolean;
  constructor(newLabel: string, newTitle: string, newType: string, newValue: any, required: boolean = false, bind: boolean = true) {
    this.label = newLabel;
    this.title = newTitle;
    this.type = newType;
    this.value = (newType == 'date' ? new Date(newValue) : newValue);
    this.required = required;
    this.bind = bind;
  }

}
