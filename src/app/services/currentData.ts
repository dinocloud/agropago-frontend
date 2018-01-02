import { Injectable } from '@angular/core';

@Injectable()
export class CurrentData {
  currentData: any;

  getCurrentData(){
    return this.currentData;
  }

  setCurrentData(data:any[]){
    this.currentData = data;
  }
}
