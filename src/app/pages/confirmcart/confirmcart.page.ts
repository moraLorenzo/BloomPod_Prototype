import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
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
  order_id: any;
  orders: any;
  index: any;

  content:any;
  bouq
  constructor(private fs: FlowersService, public router: Router, public dataService: DataService, public toastController: ToastController) { }

  ngOnInit() {
    // this.order = history.state.data;
    console.log(history.state.data);
  }
  ionViewWillEnter() {
    this.index = history.state.data.i;
    this.orders = history.state.data.order;
    this.flowername = this.orders.order_flower;
    this.primary = this.orders.main_flower;
    this.secondary = this.orders.secondary_flower;
    this.tertiary = this.orders.tertiary_flower;
    this.total = this.orders.order_totalprice;
    this.quantity = this.orders.quantity;
    this.order_id = this.orders.order_id;


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

  mode() {
    let order = this.orders;
    this.router.navigate(['mode'], {
      state: {
        data: {
          order
        },
      },
    });
  }

  cancel() {
    let order_id = this.order_id;
    let i = history.state.data.i;
    this.dataService
      .processData(btoa('cancel').replace('=', ''), { order_id }, 2)
      .subscribe((dt: any) => {
        let load = this.dataService.decrypt(dt.a);
        console.log(load.status.message);
        this.presentToast(load.status.message);
      this.router.navigate(['tabs/tab1']);
      });
  }

  back(){
    this.router.navigate(['tabs/tab4']);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

}
