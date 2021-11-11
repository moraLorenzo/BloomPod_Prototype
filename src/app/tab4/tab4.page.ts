import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data/data.service';
import { UserService } from '../services/user.service';
// import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  username: string = 'Sample Username';
  address: string = 'Sample address';
  userId: any = '38';
  orders: any;
  status: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private dataService: DataService,
    private alertController: AlertController
  ) {
    // this.userService.getFullname();
  }

  ngOnInit() {
    this.getOrders(this.userId);
  }

  ionViewWillEnter() {
    this.getOrders(this.userId);
  }

  confirmcart(order) {
    // console.log(order);
    this.router.navigate(['confirmcart'], {
      state: {
        data: {
          order
        },
      },
    });
  }
  
  toPay() {
    // console.log(this.orders);
    this.router.navigate(['toPay']);
  }

  service() {
    // console.log(this.orders);
    this.router.navigate(['service']);
  }

  completed() {
    // console.log(this.orders);
    this.router.navigate(['completed']);
  }

  public async logout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention!',
      message: 'Do you wish to log out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.userService.setUserLoggedOut();
            this.router.navigate(['login']);
          },
        },
      ],
    });

    await alert.present();
  }

  getOrders(id) {
    let user_id = id;
    console.log(user_id);
    this.dataService
      .processData(btoa('getOrders').replace('=', ''), { user_id }, 2)
      .subscribe((dt: any) => {
        let load = this.dataService.decrypt(dt.a);
        // console.log(load);
        this.orders = load.payload.orders;
        this.userService.setOrders(this.orders);
        console.log(this.orders);
        this.status = this.orders[0].order_status;
      });
  }

  doRefresh(e: any) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      e.target.complete();
    }, 2000);
  }
}
