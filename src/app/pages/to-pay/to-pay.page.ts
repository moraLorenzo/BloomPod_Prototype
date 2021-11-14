import { splitClasses } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-to-pay',
  templateUrl: './to-pay.page.html',
  styleUrls: ['./to-pay.page.scss'],
})
export class ToPayPage implements OnInit {
  orders: any;
  imgURL = '../../assets/icon/addImage.png';
  constructor(
    private userService: UserService,
    public router: Router,
    public dataService: DataService,
    public toastController: ToastController,
    private camera: Camera
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.orders = history.state.data.order;
    console.log(this.orders);
  }

  back() {
    this.router.navigate(['tabs/tab4']);
  }

  cancel(i, order) {
    let order_id = order.order_id;
    // console.log(order_id);
    this.orders.splice(i, 1);
    this.dataService
      .processData(btoa('cancel').replace('=', ''), { order_id }, 2)
      .subscribe((dt: any) => {
        let load = this.dataService.decrypt(dt.a);
        console.log(load.status.message);
        this.presentToast('Order Cancelled');
      });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  getGallery() {
    this.camera
      .getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      })
      .then(async (res) => {
        let result = 'data:image/jpeg;base64,' + res;
        this.imgURL = result;
        console.log(result);
      })
      .catch((e) => {
        console.log();
      });
  }
}
