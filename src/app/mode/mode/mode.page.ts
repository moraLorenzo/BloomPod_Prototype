import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.page.html',
  styleUrls: ['./mode.page.scss'],
})
export class ModePage implements OnInit {
  order_obj: any;
  mode: string = 'Delivery';
  constructor(public router: Router) {}

  ngOnInit() {}

  ionViewWillEnter() {
    console.log(history.state.data);
    this.order_obj = history.state.data;
  }

  onChange(deviceValue: any) {
    console.log(deviceValue);
    this.mode = deviceValue;
  }
}
