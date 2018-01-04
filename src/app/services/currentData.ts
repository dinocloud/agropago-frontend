import { Injectable } from '@angular/core';

@Injectable()
export class CurrentData {
  currentData: any;
  readOnly: boolean;

  getCurrentData(){
    return this.currentData;
  }

  setCurrentData(data:any[]){
    this.currentData = data;
  }

  setReadOnly(readOnly:boolean) {
   this.readOnly = readOnly;
  }

  getReadOnly() {
    return this.readOnly;
  }
}
