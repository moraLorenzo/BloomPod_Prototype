import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { Doctor } from '../models/doctor';
import { DataService } from '../services/data/data.service';

interface Location {
  value: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'visibility_off';
  sendfile: FormGroup;
  public registrationform: FormGroup;
  sendto: string = 'enzomora@gmail.com';
  imgURL = '../../assets/icon/addImage.png';

  constructor(
    private camera: Camera,
    public toastController: ToastController,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    private _route: Router
  ) {}

  ngOnInit() {
    // this.sendfile = this.fb.group({
    //   email: ['', Validators.required],
    //   reportfile: ['', Validators.required],
    //   newfile: ['', Validators.required],
    // });
    this.registrationform = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      otp: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon =
      this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
  }

  public async getCamera() {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
      })
      .then(async (res) => {
        let result = 'data:application/pdf;base64,' + res;
        this.imgURL = result;
        // this.doctorPayload.doc_image = this.imgURL;
        // const doc = await this.DataService.newData(this.doctorPayload);
        // console.log('Doctor', doc);
      })
      .catch((e) => {
        console.log();
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
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
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

  onSubmit() {
    let letters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    let code =
      letters[Math.floor(Math.random() * letters.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      letters[Math.floor(Math.random() * letters.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      letters[Math.floor(Math.random() * letters.length)];
    // console.log(code);

    this.registrationform.controls['otp'].setValue(code);
    this.registrationform.controls['body'].setValue(
      "<div style='background-color: antiquewhite;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;'><div style='padding: 5%'><img src='cid:Bloom'alt='Bloom Pod' width='10%' /><br /><h1>Verify your login</h1><br /><p>Below is the passcode:</p><u><h2>" +
        this.registrationform.value['otp'] +
        '</h2></u><h5>- Bloom Pod Administrator</h5></div></div>'
    );

    let u_f = this.registrationform.value['firstname'];
    let u_l = this.registrationform.value['lastname'];
    let u_e = this.registrationform.value['email'];
    let u_p = this.registrationform.value['password'];
    let u_a = this.registrationform.value['address'];
    let body = this.registrationform.value['body'];
    let otp = code;

    this.dataService
      .processData(btoa('mailer').replace('=', ''), { email: u_e, body }, 2)
      .subscribe((res: any) => {
        let payload = this.dataService.decrypt(res.a);
        console.log(payload);
        if (payload.data == 'Message has been sent') {
          this.dataService
            .processData(
              btoa('register').replace('=', ''),
              { u_f, u_l, u_e, u_p, u_a, otp },
              2
            )
            .subscribe((res: any) => {
              let payload = this.dataService.decrypt(res.a);
              if (payload.status['message'] == 'Registered successfully') {
                // console.log(res.data);
                this.presentToast(payload.status['message']);
                // this.dismiss();
                this._route.navigate(['login']);
              } else if (res.error) {
                // console.log(res.error);
                this.presentToast(res.error);

                // this.dismiss();
              }
            });
        } else if (res.error) {
          // console.log(res.error);
          this.presentToast(res.error);

          // this.dismiss();
        }
      });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const reportfile = event.target.files[0];

      this.sendfile.patchValue({
        newfile: reportfile,
      });
    }
  }
}
