import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import {
  AlertController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { Doctor } from '../models/doctor';
import { PopoverComponent } from '../pages/edit/popover/popover.component';
import { DataService } from '../services/data/data.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  show: boolean = true;

  username: string = window.sessionStorage.getItem('doctor_name');
  schedules: any;

  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    public popoverController: PopoverController
  ) {}

  async ngOnInit() {
    await this.showAccepted();
  }

  ionViewWillEnter() {
    // console.log(window.sessionStorage.getItem('doctor_id'));
    this.ngOnInit();
  }

  public async doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    await this.showAccepted();
    console.log('Async operation has ended');
  }

  public async showAccepted() {
    let doctor_name = window.sessionStorage.getItem('doctor_name');
    await this.dataService
      .processData('getdoctoraccepted', {
        doctor_name,
      })
      .then(async (res: any) => {
        if (res.error) {
          this.show = false;
        } else {
          this.show = true;
          this.schedules = res.data;
          // console.log(this.schedules);
        }
      });
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  public async presentPopover(name) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: { name },
      cssClass: 'my-custom-class',
      translucent: true,
    });
    await popover.present();

    const data = await popover.onWillDismiss();
  }

  Search(event) {
    // console.log(event.detail.value);
    if (event.detail.value == '') {
      this.showAccepted();
    } else {
      this.schedules = this.schedules.filter((res) => {
        return (
          res.account_name
            .toLocaleLowerCase()
            .match(event.detail.value.toLocaleLowerCase()) ||
          res.concern
            .toLocaleLowerCase()
            .match(event.detail.value.toLocaleLowerCase()) ||
          res.appointment_date
            .toLocaleLowerCase()
            .match(event.detail.value.toLocaleLowerCase())
        );
      });
    }
  }
}
