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

  content:any;
  bouq
  constructor(private fs: FlowersService, public router: Router, public dataService: DataService, public toastController: ToastController) { }

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
    this.order_id = orders.order_id;


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
    this.router.navigate(['mode']);
  }

  cancel() {
    let order_id = this.order_id;
    console.log(order_id);
    this.dataService
      .processData(btoa('cancel').replace('=', ''), { order_id }, 2)
      .subscribe((dt: any) => {
        let load = this.dataService.decrypt(dt.a);
        console.log(load.status.message);
        this.presentToast(load.status.message);
        this.router.navigate(['tabs/tab1']);
      });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

}
