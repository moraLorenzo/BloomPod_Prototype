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

  tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    console.log(time.join(''));
    return time.join(''); // return adjusted time or original string
  }

  onSubmit(e: any) {
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

    e.preventDefault();

    if (date < e.target[3].value) {
      let user_id = this.userId;
      let order_flower = 'Generated Flower Bouquet';
      let main_flower = this.order_obj.primary;
      let secondary_flower = this.order_obj.secondary;
      let tertiary_flower = this.order_obj.tertiary;
      let quantity = this.order_obj.quantity;
      let order_totalprice = this.order_obj.total;
      let order_payment = this.mode;
      let address = e.target[0].value;
      let order_time = e.target[4].value + 'PM';
      let order_date = e.target[3].value;

      let order_address = e.target[0].value;
      let order_landmark = e.target[1].value;
      let order_contact = e.target[2].value;
      console.log(e.target[0].value);
      console.log(e.target[1].value);
      console.log(e.target[2].value);
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
            order_date,
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
    } else if (date == e.target[3].value) {
      var time = this.tConvert(today.getHours() + ':' + today.getMinutes());
      var desiredTime = this.tConvert(e.target[4].value);
      if (time < desiredTime) {
        console.log(desiredTime);
        console.log(time);
        let user_id = this.userId;
        let order_flower = 'Generated Flower Bouquet';
        let main_flower = this.order_obj.primary;
        let secondary_flower = this.order_obj.secondary;
        let tertiary_flower = this.order_obj.tertiary;
        let quantity = this.order_obj.quantity;
        let order_totalprice = this.order_obj.total;
        let order_payment = this.mode;
        let address = e.target[0].value;
        let order_time = e.target[4].value + 'PM';
        let order_address = e.target[0].value;
        let order_landmark = e.target[1].value;
        let order_contact = e.target[2].value;
        let order_date = e.target[3].value;
        console.log(e.target[2].value);
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
              order_date,
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
      } else {
        console.log('No time for the florist');
      }
    } else {
      console.log('invalid date');
    }
  }

  pickSubmit(e: any) {
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

    e.preventDefault();

    if (date < e.target[0].value) {
      let user_id = this.userId;
      let order_flower = 'Generated Flower Bouquet';
      let main_flower = this.order_obj.primary;
      let secondary_flower = this.order_obj.secondary;
      let tertiary_flower = this.order_obj.tertiary;
      let quantity = this.order_obj.quantity;
      let order_totalprice = this.order_obj.total;
      let order_payment = this.mode;
      let address = null;
      let order_time = e.target[1].value + 'PM';
      let order_date = e.target[0].value;
      let order_address = null;
      let order_landmark = null;
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
            order_date,
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
    } else if (date == e.target[0].value) {
      var time = this.tConvert(today.getHours() + ':' + today.getMinutes());
      var desiredTime = this.tConvert(e.target[1].value);
      if (time < desiredTime) {
        console.log(desiredTime);
        let user_id = this.userId;
        let order_flower = 'Generated Flower Bouquet';
        let main_flower = this.order_obj.primary;
        let secondary_flower = this.order_obj.secondary;
        let tertiary_flower = this.order_obj.tertiary;
        let quantity = this.order_obj.quantity;
        let order_totalprice = this.order_obj.total;
        let order_payment = this.mode;
        let address = null;
        let order_time = e.target[1].value + 'PM';
        let order_date = e.target[0].value;

        let order_address = null;
        let order_landmark = null;
        let order_contact = e.target[2].value;
        console.log(e.target[2].value);
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
              order_date,
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
      } else {
        console.log('No time for the florist');
      }
    } else {
      console.log('invalid date');
    }
  }
}
