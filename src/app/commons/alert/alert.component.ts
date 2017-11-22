import { Component, OnInit } from '@angular/core';

// import { AlertService } from '../_services/index';

@Component({
  moduleId: module.id,
  selector: 'alert',
  templateUrl: 'alert.component.html'
})

export class AlertComponent {
  message: any;
  // private alertService: AlertService
  constructor() { }

  ngOnInit() {
    // this.alertService.getMessage().subscribe(message => { this.message = message; });
  }
}
