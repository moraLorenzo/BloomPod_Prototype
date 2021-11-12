import { splitClasses } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-to-pay',
  templateUrl: './to-pay.page.html',
  styleUrls: ['./to-pay.page.scss'],
})
export class ToPayPage implements OnInit {
  orders: any;
  constructor(
    private userService: UserService, 
    public router: Router, 
    public dataService: DataService, 
    public toastController: ToastController) {  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.orders = history.state.data.order;
  }

  back(){
    this.router.navigate(['tabs/tab4']);
  }

  cancel(i,order) {
    let order_id = order.order_id;
    // console.log(order_id);
    this.orders.splice(i,1);
    this.dataService
      .processData(btoa('cancel').replace('=', ''), { order_id }, 2)
      .subscribe((dt: any) => {
        let load = this.dataService.decrypt(dt.a);
        console.log(load.status.message);
        this.presentToast("Order Cancelled");
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
