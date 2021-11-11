import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import {
  AlertController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { Doctor } from '../models/doctor';
// import { PopoverComponent } from '../pages/edit/popover/popover.component';
import { DataService } from '../services/data/data.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  greet: string = 'Good Day';

  username: string = 'Sample User';
  schedules: any;

  month: string = 'Sample Month';

  months: any = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  user_obj: any;

  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    public popoverController: PopoverController,
    private userService: UserService
  ) {
    var myDate = new Date();
    var hrs = myDate.getHours();

    if (hrs < 12) this.greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17) this.greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24) this.greet = 'Good Evening';

    this.month = this.months[new Date().getMonth()];
  }

  async ngOnInit() {}

  ionViewWillEnter() {
    // console.log(window.sessionStorage.getItem('doctor_id'));
    this.ngOnInit();
    this.user_obj = this.userService.getUser();
    this.username =
      this.user_obj.user_firstname + ' ' + this.user_obj.user_lastname;
  }

  public async doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);

    console.log('Async operation has ended');
  }
}
