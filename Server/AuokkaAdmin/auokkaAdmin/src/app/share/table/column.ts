export class Column {
  static ASCENDING = 0;
  static DESCENDING = 1;

  sortOrder: number = Column.ASCENDING;

  constructor(public label: string, public attribute: string[] = [], public type: string = '', public sortable: boolean = false) {

  }
}
