import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.page.html',
  styleUrls: ['./custom.page.scss'],
})
@Pipe({ name: 'replaceUnderscore' })
export class CustomPage implements OnInit {
  Flowers = [
    { flower_name: 'rose' },
    { flower_name: 'sunflower' },
    { flower_name: 'lily' },
  ];

  quantity: number = 0;

  constructor(
    private dataService: DataService,
    private router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  transform(value: string): string {
    return value ? value.replace(/_/g, ' ') : value;
  }

  ionViewWillEnter() {
    this.dataService
      .processData(btoa('get_flowers').replace('=', ''), null, 2)
      .subscribe(
        (dt: any) => {
          let load = this.dataService.decrypt(dt.a);
          console.log(load);
          this.Flowers = load.payload.data;
        },
        (er) => {
          console.log('Invalid Inputs', er);
        }
      );
  }

  Search(event) {
    // console.log(event.detail.value);
    if (event.detail.value == '') {
      this.ionViewWillEnter();
    } else {
      this.Flowers = this.Flowers.filter((res) => {
        return res.flower_name
          .toLocaleLowerCase()
          .match(event.detail.value.toLocaleLowerCase());
      });
    }
  }

  onChange(deviceValue: any) {
    // console.log(deviceValue);
    this.quantity = deviceValue;
  }

  generate(str: any) {
    console.log(str);
    console.log(this.quantity);

    if (this.quantity != 0) {
      this.router.navigate(['custom/generate'], {
        state: { data: { flower_name: str, quantity: this.quantity } },
      });
    } else {
      this.presentToast('Please Determine Flower Quantity');
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
