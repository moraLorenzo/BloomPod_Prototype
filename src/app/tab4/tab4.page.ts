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
  userId: any;
  orders: any;
  status: any;

  user_obj: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private dataService: DataService,
    private alertController: AlertController
  ) {
    // this.userService.getFullname();
    // console.log("here");

  }

  ngOnInit() {
    // this.getOrders(this.userId);
    this.user_obj = this.userService.getUser();
    this.username =
      this.user_obj.user_firstname + ' ' + this.user_obj.user_lastname;
    this.address = this.user_obj.user_address;
    this.userId = this.user_obj.user_id;
  }

  ionViewWillEnter() {
    // this.user_obj = this.userService.getUser();
    // this.username =
    //   this.user_obj.user_firstname + ' ' + this.user_obj.user_lastname;
    // this.address = this.user_obj.user_address;
    // this.userId = this.user_obj.user_id;
    // console.log("here");
    // console.log("here");

    this.getOrders(this.userId);
  }

  ionViewDidEnter(){
    console.log("here");
    this.getOrders(this.userId);

  }



  confirmcart(i, order) {
    // console.log(order);
    let order_obj = this.orders;
    this.router.navigate(['confirmcart'], {
      state: {
        data: {
          i, order
        },
      },
    });
  }
  
  toPay() {
    // console.log(this.orders);
    let order = this.orders;
    this.router.navigate(['toPay'], {
      state: {
        data: {
          order
        },
      },
    });
  }

  service() {
    // console.log(this.orders);
    let order = this.orders;
    this.router.navigate(['service'], {
      state: {
        data: {
          order
        },
      },
    });
  }

  completed() {
    // console.log(this.orders);
    let order = this.orders;
    this.router.navigate(['completed'], {
      state: {
        data: {
          order
        },
      },
    });
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
    this.orders = [];
    let user_id = id;
    console.log(user_id);
    this.dataService
      .processData(btoa('getOrders').replace('=', ''), { user_id }, 2)
      .subscribe((dt: any) => {
        let load = this.dataService.decrypt(dt.a);
        // console.log(load);
        this.orders = load.payload.orders.reverse();
        // console.log(load);
        // this.status = this.orders[0].order_status;
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
