import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data/data.service';
import { FlowersService } from '../services/flower.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {
  bouquet_obj: any;
  content: any;
  total: number = 0;

  primary = null;
  secondary = null;
  tertiary = null;

  primary_price: any;
  secondary_price: any;
  tertiary_price: any;

  quantity: any;
  user_obj: any;
  userId: any;
  constructor(
    public router: Router,
    private userService: UserService,
    private fs: FlowersService,
    private dataService: DataService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    // console.log(history.state.data);
    this.user_obj = this.userService.getUser();
    this.userId = this.user_obj.user_id;

    this.bouquet_obj = history.state.data;

    this.quantity = this.bouquet_obj.quantity;
    this.primary = this.bouquet_obj.primary;
    this.secondary = this.bouquet_obj.secondary;
    this.tertiary = this.bouquet_obj.tertiary;

    this.primary_price = this.bouquet_obj.primary_price;
    this.secondary_price = this.bouquet_obj.secondary_price;
    this.tertiary_price = this.bouquet_obj.tertiary_price;

    console.log(this.bouquet_obj);
    if (this.bouquet_obj.quantity == 6) {
      this.content = this.fs.six(
        this.bouquet_obj.primary,
        this.bouquet_obj.secondary
      );
      this.total = this.bouquet_obj.primary_price * 3;
      this.total += +this.bouquet_obj.secondary_price * 3;
      console.log(this.total);
    } else if (this.bouquet_obj.quantity == 9) {
      this.content = this.fs.nine(
        this.bouquet_obj.primary,
        this.bouquet_obj.secondary
      );
      this.total = this.bouquet_obj.primary_price * 3;
      this.total += +this.bouquet_obj.secondary_price * 6;
      console.log(this.total);
    } else if (this.bouquet_obj.quantity == 12) {
      this.content = this.fs.twelve(this.bouquet_obj.primary, [
        this.bouquet_obj.secondary,
        this.bouquet_obj.tertiary,
      ]);

      this.total = this.bouquet_obj.primary_price * 4;
      this.total += +this.bouquet_obj.secondary_price * 4;
      this.total += +this.bouquet_obj.tertiary_price * 4;
      console.log(this.total);
    }
  }

  mode() {
    this.router.navigate(['mode'], {
      state: {
        data: {
          primary: this.primary,
          primary_price: this.primary_price,
          secondary: this.secondary,
          secondary_price: this.secondary_price,
          tertiary: this.tertiary,
          tertiary_price: this.tertiary_price,
          quantity: this.quantity,
          total: this.total,
        },
      },
    });
  }

  add_to_cart() {
    let user_id = this.userId;
    let order_flower = 'Generated Bouquet';
    let main_flower = this.primary;
    let secondary_flower = this.secondary;
    let tertiary_flower = this.tertiary;
    let order_totalprice = this.total;
    let quantity = this.quantity;
    if (this.quantity == 6 || this.quantity == 9) {
      this.dataService
        .processData(
          btoa('add_to_cart').replace('=', ''),
          {
            user_id,
            order_flower,
            quantity,
            main_flower,
            secondary_flower,
            tertiary_flower: null,
            order_totalprice,
          },
          2
        )
        .subscribe(
          (dt: any) => {
            // console.log(dt.a);
            let load = this.dataService.decrypt(dt.a);
            console.log(load);
            this.router.navigate(['tabs/tab4']);
          },
          (er) => {
            console.log('Invalid Inputs');
          }
        );
    } else if (this.quantity == 12) {
      this.dataService
        .processData(
          btoa('add_to_cart').replace('=', ''),
          {
            user_id,
            order_flower,
            quantity,
            main_flower,
            secondary_flower,
            tertiary_flower,
            order_totalprice,
          },
          2
        )
        .subscribe(
          (dt: any) => {
            // console.log(dt.a);
            let load = this.dataService.decrypt(dt.a);
            console.log(load);
            // this.router.navigate(['tabs/tab4']);

            this.router.navigateByUrl('/tabs/tab4', {
              skipLocationChange: true,
            });

            // this.navCtrl.navigateRoot('/tabs/tab4');
          },
          (er) => {
            console.log('Invalid Inputs');
          }
        );
    }
  }
}
