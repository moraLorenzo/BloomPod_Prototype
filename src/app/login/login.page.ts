import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController,LoadingController, PopoverController } from '@ionic/angular';
import { OTPPage } from '../popovers/otp/otp.page';
import { DataService } from '../services/data/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  passwordType: string = 'password';
  passwordIcon: string = 'visibility_off';
  isAccepted: boolean = false;
  OTP: any;

  constructor(
    private _router: Router,
    private dataService: DataService,
    public toastController: ToastController,
    private userService: UserService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.userService.isUserLoggedIn()) {
      this._router.navigate(['tabs']);
    }
  }

  navReg() {
    this.email = '';
    this.password = '';
    this._router.navigate(['register']);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon =
      this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
  }

  // async checkAccepted(): Promise<boolean> {
  //   let param1 = this.email;
  //   let param2 = this.password;

  //   await this.dataService
  //     .processData('doctoraccepted', { param1, param2 })
  //     .then(async (res: any) => {
  //       if (res.error) {
  //         this.isAccepted = false;
  //       } else if (res) {
  //         this.isAccepted = true;
  //       } else {
  //         this.isAccepted = false;
  //       }
  //     });

  //   return this.isAccepted;
  // }

  // public async checklogin(e) {
  //   let param1 = e.target[0].value;
  //   let param2 = e.target[1].value;

  //   await this.dataService
  //     .processData('logindoctor', { param1, param2 })
  //     .then(async (res: any) => {
  //       if (res.error) {
  //         this.presentToast('Invalid Inputs');
  //       } else {
  //         let isAccepted = await this.checkAccepted();
  //         if (isAccepted) {
  //           window.sessionStorage.setItem('doctor_id', res.data.doctor_id);
  //           window.sessionStorage.setItem('doctor_name', res.data.doctor_name);
  //           this.presentToast(
  //             'Successfully logged in ' +
  //               window.sessionStorage.getItem('doctor_name')
  //           );
  //           this.email = '';
  //           this.password = '';
  //           this.passwordIcon = 'visibility_off';
  //           this.userService.setLoggedIn();
  //           this.router.navigate(['tabs']);
  //         } else {
  //           this.presentToast('Account not yet Accepted');
  //         }
  //       }
  //     })
  //     .catch(async (err) => {
  //       await this.presentToast('Invalid inputs');
  //       // console.log(`login failed ${err}`);
  //     });
  // }

  onSubmit(e) {
    e.preventDefault();
    let f = e.target.elements;
    let email = e.target[0].value;
    let password = e.target[1].value;

    this.dataService
      .processData(btoa('login').replace('=', ''), { email, password }, 2)
      .subscribe(
        (dt: any) => {
          // console.log(dt.a);
          let load = this.dataService.decrypt(dt.a);
          // console.log(load.status);

          if (load.status['remarks'] == 'success') {
            this.userService.setUser(load.payload.name[0]);
            console.log(load.payload.name[0]);
            this._router.navigate(['tabs']);
          } else if (
            load.status['remarks'] == 'failed' &&
            load.status['message'] == 'Email not yet verified'
          ) {
            console.log(load.status['message']);
            this.presentPopover();
          } else if (
            load.status['remarks'] == 'failed' &&
            load.status['message'] == 'Incorrect username or password'
          ) {
            console.log(load.status['message']);
          }

        },
        (er) => {
          this.presentToast('Invalid Inputs');
        }
      );
  }

  public async presentPopover() {
    const popover = await this.popoverController.create({
      component: OTPPage,
      cssClass: 'my-custom-class',
      translucent: true,
    });
    await popover.present();

    const data = await popover.onWillDismiss();

    if (data['data']['OTP']) {
      // console.log(data['data']['OTP']);
      this.OTP = data['data']['OTP'];

      this.user_OTP();
    } else {
      // console.log('hello');
      this.presentToast('Required input');
    }
    // this.rating();
  }

  user_OTP() {
    this.dataService
      .processData(
        btoa('otp').replace('=', ''),
        { otp: this.OTP, email: this.email },
        2
      )
      .subscribe(
        (dt: any) => {
          // console.log(dt.a);
          let load = this.dataService.decrypt(dt.a);
          console.log(load.status);

          if (load.status['remarks'] == 'success') {
            console.log(load);
            this.userService.setUser(load.payload.name.data[0]);
            this._router.navigate(['tabs']);
          } else if (load.status['remarks'] == 'failed') {
            console.log(load.status['message']);
            this.presentPopover();
          }

          // email = this.userService.getEmail();
          // this.userService.setUserLoggedIn(load.name, load.key, load.id);
        },
        (er) => {
          this.presentToast('Invalid Inputs OTP');
        }
      );
  }
}