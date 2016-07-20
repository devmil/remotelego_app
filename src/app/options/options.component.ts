import { Component, OnInit, Input } from '@angular/core';
import { LegoCar } from "./../shared/LegoCar"
@Component({
  moduleId: module.id,
  selector: 'car-options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.css']
})
export class CarOptionsComponent implements OnInit {

  @Input()
  model: LegoCar;
  constructor() { }

  ngOnInit() {
  }

}
