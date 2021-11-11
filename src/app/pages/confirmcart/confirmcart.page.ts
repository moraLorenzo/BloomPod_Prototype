import { Component, OnInit } from '@angular/core';
import { FlowersService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-confirmcart',
  templateUrl: './confirmcart.page.html',
  styleUrls: ['./confirmcart.page.scss'],
})
export class ConfirmcartPage implements OnInit {
  flowername: any;
  primary: any;
  secondary: any;
  tertiary: any;
  total: any;
  quantity: any;

  content:any;
  bouq
  constructor(private fs: FlowersService) { }

  ngOnInit() {
    // this.order = history.state.data;
    console.log(history.state.data);
  }
  ionViewWillEnter() {
    let orders = history.state.data.order;
    this.flowername = orders.order_flower;
    this.primary = orders.main_flower;
    this.secondary = orders.secondary_flower;
    this.tertiary = orders.tertiary_flower;
    this.total = orders.order_totalprice;
    this.quantity = orders.quantity;

    if ( this.quantity == 6) {
      this.content = this.fs.six(
        this.primary,
        this.secondary
      );

    } else if ( this.quantity == 9) {
      this.content = this.fs.nine(
        this.primary,
        this.secondary
      );
  
    } else if ( this.quantity == 12) {
      this.content = this.fs.twelve(this.primary, [
        this.secondary,
        this.tertiary,
      ]);
      console.log(this.total);
    }
  }



}
