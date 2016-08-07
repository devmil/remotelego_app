import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LegoCar } from "./../shared/LegoCar";
import {NgClass} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'car-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css'],
  directives:[NgClass]
})
export class CarSettingsComponent implements OnInit {

  @Input()  model: LegoCar;
  @Output() onLeaveSettings = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  doSave() {
	this.leave();
  }

  doDiscard() {
	this.leave();
  }

  leave(){
	  this.onLeaveSettings.emit(true);
  }

}
