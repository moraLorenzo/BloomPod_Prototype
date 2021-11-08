import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  doctor: string;
  email: string;
  specialization: string;
  address: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private dataService: DataService,
    private alertController: AlertController
  ) {
    // this.getDoctor();
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

  // public async getDoctor() {
  //   let doctor_id = window.sessionStorage.getItem('doctor_id');
  //   await this.dataService
  //     .processData('getdoctor', {
  //       doctor_id,
  //     })
  //     .then(async (res: any) => {
  //       this.doctor = res.data[0]['doctor_name'];
  //       this.email = res.data[0]['doctor_email'];
  //       this.specialization = res.data[0]['doctor_specialization'];
  //       this.address = res.data[0]['doctor_address'];

  //       console.log(res);
  //     });
  // }
}
