import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlowersService } from '../services/flower.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {
  bouquet_obj: any;
  content: any;
  total: number = 0;

  primary: any;
  secondary: any;
  tertiary: any;

  primary_price: any;
  secondary_price: any;
  tertiary_price: any;

  quantity: any;
  constructor(public router: Router, private fs: FlowersService) {}

  ngOnInit() {}

  profile() {
    this.router.navigate(['tabs/tab4']);
  }

  ionViewWillEnter() {
    // console.log(history.state.data);
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
    } else if (this.bouquet_obj.quantity == 9) {
      this.content = this.fs.nine(
        this.bouquet_obj.primary,
        this.bouquet_obj.secondary
      );
      this.total = this.bouquet_obj.primary_price * 3;
      this.total += +this.bouquet_obj.secondary_price * 6;
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
}
