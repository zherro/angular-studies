import { Component, Input, OnInit } from '@angular/core';
import { Alert, Alertype } from './alert';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() timeout = 3000;
  alerts: Alert[] = [];

  constructor(
    private service: AlertService
  ) { }

  ngOnInit() {
      this.service
        .getAlert()
        .subscribe(alert => {
          if(!alert) {
            this.alerts = [];
            return;
          }
          this.alerts.push(alert);
          setTimeout(() => this.removeAlert(alert), this.timeout);
        });
  }

  removeAlert(alertToRemove: Alert) {
    this.alerts = this.alerts.filter(alert => alert != alertToRemove);
  }

  getAlertClass(alert: Alert) {
    if(!alert) return;

    switch (alert.type) {
      case Alertype.INFO:
          return "alert card blue lighten-4 blue-text text-darken-3";
      case Alertype.WARNING:
          return "alert card amber lighten-4 brown-text";
      case Alertype.DANGER:
          return "alert card red lighten-4 red-text text-darken-4";
      case Alertype.SUCCESS:
          return "alert card green lighten-4 green-text text-darken-4";
    }
  }
  getAlertIcon(alert: Alert) {
    if(!alert) return;

    switch (alert.type) {
      case Alertype.INFO:
      case Alertype.DANGER:
          return "fa fa-info-circle";
      case Alertype.WARNING:
          return "fa fa-warning";
      case Alertype.SUCCESS:
          return "fa fa-check-circle";
    }
  }
}
