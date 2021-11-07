import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  location;
  doctor;
  specialization;
  doctorNote;
  date;
  status;
  concern;
  color;
  title = ['baypointe', 'ourlady', 'james', 'st,jude', 'zmmg'];

  constructor(
    public modalController: ModalController,
    private dataService: DataService,
    private alertController: AlertController,
    public toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(window.sessionStorage.getItem('some_id'));
    this.getsched();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  getsched() {
    this.dataService
      .processData('getdoctorschedule', {
        doctor_name: window.sessionStorage.getItem('doctor_name'),
        schedule_id: window.sessionStorage.getItem('some_id'),
      })
      .then((res: any) => {
        try {
          // console.log(res);
          this.location = res.data[0]['doctor_address'];
          this.doctor = res.data[0]['account_name'];
          this.specialization = res.data[0]['doctor_specialization'];
          this.date = res.data[0]['appointment_date'];
          this.status = res.data[0]['schedule_status'];
          this.concern = res.data[0]['concern'];
          this.color = res.data[0]['color'];
          if (res.data[0]['doctor_note'] == '') {
            this.doctorNote = 'none';
          } else {
            this.doctorNote = res.data[0]['doctor_note'];
          }
          // res.data[0]['account_name']
          // this.location =
        } catch (err) {
          console.log(err);
        }
      });
  }

  async presentAlertConfirm(stat) {
    if (stat == 'accepted') {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Attention',
        message: 'What do you want to do with this appointment?',
        buttons: [
          {
            text: 'nothing',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (data) => {
              this.presentToast('No changes saved');
            },
          },
          {
            text: 'Mark served',
            handler: () => {
              this.served();
            },
          },
          {
            text: 'Cancel Appointment',
            handler: () => {
              this.cancel();
            },
          },
        ],
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Attention',
        message: 'Do you wish to accept this appointment?',
        buttons: [
          {
            text: 'nothing',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (data) => {
              this.presentToast('No changes saved');
            },
          },
          {
            text: 'Accept',
            handler: () => {
              this.accept();
            },
          },
          {
            text: 'Cancel Appointment',
            handler: () => {
              this.cancel();
            },
          },
        ],
      });

      await alert.present();
    }
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  cancel() {
    this.dataService
      .processData('updateschedule', {
        schedule_status: 'cancelled by doctor',
        color: 'danger',
        schedule_id: window.sessionStorage.getItem('some_id'),
      })
      .then(async (res: any) => {
        // console.log(res);
        if (res == true) {
          this.getsched();
          this.presentToast('Successfully cancelled');
          this.modalController.dismiss();
        } else {
          this.presentToast('Email not yet verified, check your email');
        }
      });
  }

  served() {
    this.dataService
      .processData('updateschedule', {
        schedule_status: 'served',
        color: 'success',
        schedule_id: window.sessionStorage.getItem('some_id'),
      })
      .then(async (res: any) => {
        // console.log(res);
        if (res == true) {
          this.getsched();
          this.presentToast('Successfully cancelled');
          this.modalController.dismiss();
        } else {
          this.presentToast('Email not yet verified, check your email');
        }
      });
  }

  accept() {
    this.dataService
      .processData('updateschedule', {
        schedule_status: 'accepted',
        color: 'success',
        schedule_id: window.sessionStorage.getItem('some_id'),
      })
      .then(async (res: any) => {
        // console.log(res);
        if (res == true) {
          this.getsched();
          this.presentToast('Successfully cancelled');
          this.modalController.dismiss();
        } else {
          this.presentToast('Email not yet verified, check your email');
        }
      });
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Doctor Note',
      inputs: [
        {
          name: 'name1',
          type: 'textarea',
          placeholder: 'Input note for Client here',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (name) => {
            if (name.name1) {
              let note = name.name1;
              note = note.replace("'", "\\'");
              console.log(note);
              this.dataService
                .processData('postDoctorNote', {
                  schedule_id: window.sessionStorage.getItem('some_id'),
                  doctor_note: note,
                })
                .then((res: any) => {
                  if (res) {
                    this.ngOnInit();
                  }
                })
                .catch((e) => {
                  this.presentToast('Observe symbol usage');
                });
            } else {
              this.presentToast(
                'Required field not filled up, no changes saved'
              );
            }
          },
        },
      ],
    });

    await alert.present();
  }

  public async addDocNote() {}
}
