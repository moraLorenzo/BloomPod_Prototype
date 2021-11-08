import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {
  username: string = 'Sample Username';
  address: string = 'Sample address';
  constructor(
    private userService: UserService,
    private router: Router,
    private dataService: DataService,
    private alertController: AlertController
  ) {
    this.getDoctor();
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

  public async getDoctor() {}

  doRefresh(e: any) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      e.target.complete();
    }, 2000);
  }
}
