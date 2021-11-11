import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-quick',
  templateUrl: './quick.page.html',
  styleUrls: ['./quick.page.scss'],
})
export class QuickPage implements OnInit {
  Flowers = [
    { flower_name: 'rose' },
    { flower_name: 'sunflower' },
    { flower_name: 'lily' },
  ];

  prices = [];
  //To be continued
  constructor(
    private dataService: DataService,
    private router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.dataService
      .processData(btoa('get_bouquets').replace('=', ''), null, 2)
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
}
