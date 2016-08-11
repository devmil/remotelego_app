import { Component } from '@angular/core';
import { LegoCar } from './shared/LegoCar';
import { Utils } from './shared/Utils';
import { CarControlComponent } from "./control/control.component";
import { CarOptionsComponent} from "./options/options.component";
import { BluetoothDummy } from "./shared/BluetoothDummy";


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [CarControlComponent, CarOptionsComponent]
})
export class AppComponent {
  currentDevice: any = null;
  currentServer: any = null;
  currentModel: LegoCar = null;
  doesntSupportWebBluetooth: boolean = false;

  constructor() {
    var nav : any = navigator;
    //when WebBluetooth isn't supported then switch to a dummy
    if(nav.bluetooth == undefined && (Utils.androidVersion < 6) || !Utils.isChrome) {
      nav.bluetooth = new BluetoothDummy();
    }
    this.doesntSupportWebBluetooth = nav.bluetooth == undefined;
  }

  doConnect() {
    var serverTemp: any;
    var deviceTemp: any;

    var nav : any = navigator;
    nav.bluetooth
      .requestDevice({ filters: [{ services: ['40480f29-7bad-4ea5-8bf8-499405c9b324'] }] })
      .then(device => {
        deviceTemp = device;
        device.addEventListener('gattserverdisconnected', this.onGattDisconnected);
        return device.gatt.connect()
      })
      .then(server => {
        serverTemp = server;
        return server.getPrimaryService('40480f29-7bad-4ea5-8bf8-499405c9b324');
      })
      .then(service => {
        this.init(service, deviceTemp, serverTemp);
      })
      .catch(error => {
        console.log(error);
        this.doDisconnect();
      })
  }

  onGattDisconnected() {
    if(this.deinit) {
      this.deinit();
    }
  }

  isConnected(){
    return this.currentDevice != null;
  }

  toggleConnectionStatus(){
    if(this.isConnected()){
      this.doDisconnect();
    }
    else{
      this.doConnect();
    }
  }

  doDisconnect() {
    if (this.currentDevice != null) {
      if (this.currentDevice.gatt.connected) {
        this.currentDevice.gatt.disconnect();
      }
    }
    this.deinit();
  }

  deinit() {
    this.currentDevice = null;
    this.currentServer = null;
    this.currentModel = null;
  }

  init(service, device, server) {
    this.currentDevice = device;
    this.currentServer = server;
    let carModel = new LegoCar(server, service, device.name);
    carModel.initData();
    this.currentModel = carModel;
  } 
}
