import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LegoCar } from "./../shared/LegoCar";
import {NgClass} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'car-options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.css'],
  directives:[NgClass]
})
export class CarOptionsComponent implements OnInit {

  @Input()  model: LegoCar;
  @Output() onDisconnect = new EventEmitter<boolean>();
  @Output() onEnterSettings = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  disconnect(){
    this.onDisconnect.emit(true);
  }

  enterSettings() {
    this.onEnterSettings.emit(true);
  }

}
