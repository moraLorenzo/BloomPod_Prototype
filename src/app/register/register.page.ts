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
  sendto: string = 'enzomora@gmail.com';

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  locations: Location[] = [
    { value: 'James L. Gordon Memorial Hospital' },
    { value: 'Baypointe Hospital' },
    { value: 'St. Jude Hospital' },
    { value: 'Our Lady of Lourdes' },
    { value: 'Mother and Child Hospital' },
    { value: 'ZMMG Hospital' },
  ];

  doctorPayload: Doctor;
  imgURL = '../../assets/icon/addImage.png';

  doctor_name: string;
  doctor_password: string;
  doctor_specialization: string;
  doctor_address: string;
  registration_month: string;
  monthNames = [
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

  constructor(
    private camera: Camera,
    public toastController: ToastController,
    public DataService: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {
    console.log('Payload: ', this.doctorPayload);
    this.doctorPayload = new Doctor();
    console.log('Payload: ', this.doctorPayload);
  }

  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required],
    // });

    this.sendfile = this.fb.group({
      email: ['', Validators.required],
      reportfile: ['', Validators.required],
      newfile: ['', Validators.required],
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

  public async regDoc() {
    console.log(this.doctorPayload);
    const thisMonth = this.monthNames[new Date().getMonth()];
    this.doctorPayload.registration_month = thisMonth;
    console.log(this.doctorPayload);

    if (this.imgURL != '../../assets/icon/addImage.png') {
      this.doctorPayload.doc_image = this.imgURL;
    } else {
      this.doctorPayload.doc_image = '';
    }
    console.log(this.imgURL);

    if (
      this.doctorPayload.doctor_name &&
      this.doctorPayload.doctor_email &&
      this.doctorPayload.doctor_specialization &&
      this.doctorPayload.doctor_address &&
      this.doctorPayload.registration_month &&
      this.doctorPayload.doc_image
    ) {
      const doc = await this.DataService.newData(this.doctorPayload);
      this.presentToast(
        'Successfully Registered, wait until our administrators accept your registration. Thank you'
      );
      this.router.navigate(['login']);
    } else {
      this.presentToast('All fields are required');
    }

    // console.log('Doctor', doc);
  }

  changeClient(data) {
    alert('selected --->' + this.locations[data].value);
  }

  public async checkDoc() {
    let param1 = this.doctorPayload.doctor_name;
    let param2 = this.doctorPayload.doctor_email;

    this.DataService.processData('checkdoctor', {
      param1,
      param2,
    }).then(async (res: any) => {
      try {
        if (res.error) {
          this.presentToast('Invalid inputs');
        } else {
          await this.regDoc();
        }
      } catch (err) {
        this.presentToast('Invalid inputs');
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

  // async submitPdf(event: any) {
  //   var formData = new FormData();
  //   formData.append('email', this.sendfile.get('email').value);
  //   formData.append('attachment', this.sendfile.get('newfile').value);
  //   // console.log(this.sendfile.get('newfile').value);
  //   console.log(this.sendfile.value);
  // }

  async submitPdf(event: any) {
    var formData = new FormData();
    formData.append('email', this.sendfile.get('email').value);
    formData.append('attachment', this.sendfile.get('newfile').value);
    console.log(this.sendfile.get('newfile').value);
    try {
      this.DataService.formData('sendemailattachment', formData).subscribe(
        (res: any) => {
          if (res.success) {
            console.log(res.success);
          } else {
          }
        }
      );
    } catch (error) {
      console.log('err', error);
    }
  }
}
