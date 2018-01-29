export class Employee {

  id: string = '';
  name: string = '';
  role: string = '';
  company: string = '';
  boardingDates: BordingDate[] = [];


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}

export class BordingDate {

  start:Date = null;
  end:Date = null;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}



