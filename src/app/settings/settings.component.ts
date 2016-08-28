import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LegoCar } from "./../shared/LegoCar";
import { LegoCarConfiguration, ValidationError } from "./../shared/LegoCarConfiguration";
import {NgClass, NgIf, NgFor} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'car-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css'],
  directives: [NgClass, NgIf, NgFor]
})
export class CarSettingsComponent implements OnInit {

  @Input() model: LegoCar;
  @Output() onLeaveSettings = new EventEmitter<boolean>();

  config: LegoCarConfiguration;
  validationMessages: ValidationError[];

  constructor() { }

  ngOnInit() {
    // configuration accessor is cloning the config each time, maybe better to not do that
    this.config = this.model.configuration;
  }

  doSave() {
    this.validationMessages = this.config.validate();

    if (!this.validationMessages || this.validationMessages.length == 0) {
      this.model.configuration = this.config;
      this.leave();
    }
  }

  doDiscard() {
    this.config = this.model.configuration;
    this.leave();
  }

  leave() {
    this.onLeaveSettings.emit(true);
  }

}
