import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.page.html',
  styleUrls: ['./mode.page.scss'],
})
export class ModePage implements OnInit {
  order_obj: any;
  mode: string = 'Delivery';
  time: string = '';
  userId: any;
  user_obj: any;

  constructor(
    public router: Router,
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.user_obj = this.userService.getUser();
    this.userId = this.user_obj.user_id;
    console.log(history.state.data);
    this.order_obj = history.state.data;
  }

  onChange(deviceValue: any) {
    console.log(deviceValue);
    this.mode = deviceValue;
  }

  timeChange(deviceValue: any) {
    console.log(deviceValue);
    this.time = deviceValue;
  }

  onSubmit(e: any) {
    e.preventDefault();
    console.log(this.mode);
    console.log(e.target[0].value);
    // user_id, order_flower,quantity,main_flower, secondary_flower, tertiary_flower,order_totalprice,order_contact, order_time, order_landmark,order_address,order_payment

    let user_id = this.userId;
    let order_flower = 'Generated Flower Bouquet';
    let main_flower = this.order_obj.primary;
    let secondary_flower = this.order_obj.secondary;
    let tertiary_flower = this.order_obj.tertiary;
    let quantity = this.order_obj.quantity;
    let order_totalprice = this.order_obj.total;
    let order_payment = this.mode;
    let address = e.target[0].value;
    let order_time = '1:00pm';

    if (order_payment == 'Delivery') {
      let order_address = e.target[0].value;
      let order_landmark = e.target[1].value;
      let order_contact = e.target[2].value;
      if (quantity == 6 || quantity == 9) {
        tertiary_flower = null;
      }
      this.dataService
        .processData(
          btoa('checkout').replace('=', ''),
          {
            user_id,
            order_flower,
            main_flower,
            secondary_flower,
            tertiary_flower,
            quantity,
            order_totalprice,
            order_payment,
            address,
            order_time,
            order_landmark,
            order_address,
            order_contact,
          },
          2
        )
        .subscribe(
          (dt: any) => {
            // console.log(dt.a);
            let load = this.dataService.decrypt(dt.a);
            console.log(load.status);
          },
          (er) => {
            console.log('Invalid Inputs');
          }
        );
    } else if (order_payment == 'Pick Up') {
      let order_address = null;
      let order_landmark = null;
      let order_contact = e.target[0].value;
      if (quantity == 6 || quantity == 9) {
        tertiary_flower = null;
      }
      this.dataService
        .processData(
          btoa('checkout').replace('=', ''),
          {
            user_id,
            order_flower,
            main_flower,
            secondary_flower,
            tertiary_flower,
            quantity,
            order_totalprice,
            order_payment,
            address,
            order_time,
            order_landmark: null,
            order_address: null,
            order_contact,
          },
          2
        )
        .subscribe(
          (dt: any) => {
            // console.log(dt.a);
            let load = this.dataService.decrypt(dt.a);
            console.log(load.status);
          },
          (er) => {
            console.log('Invalid Inputs');
          }
        );
    }
  }
}
