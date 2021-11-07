import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { EditPage } from '../pages/edit/edit.page';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  show: boolean = true;
  schedules: any;
  doctor_name = window.sessionStorage.getItem('doctor_name');
  index;

  constructor(
    private dataService: DataService,
    public modalController: ModalController,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.getRequests();
  }

  ionViewWillEnter() {
    // console.log(window.sessionStorage.getItem('doctor_id'));
    this.getRequests();
  }

  public async doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    await this.getRequests();
    console.log('Async operation has ended');
  }

  public async getRequests() {
    await this.dataService
      .processData('getrequests', {
        doctor_name: this.doctor_name,
      })
      .then(async (res: any) => {
        if (res.error) {
          this.show = false;
        } else {
          this.show = true;
          this.schedules = res.data;
          // console.log(this.schedules);
        }
        // this.schedules = res.data;
      });
  }

  public async delete(id, index) {
    this.index = index;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '⚠ Attention',
      message: 'Do you wish to delete this appointment?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteAppointment(id);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteAppointment(id) {
    await this.dataService
      .processData('deleteschedule', {
        schedule_id: id,
      })
      .then(async (res: any) => {
        if (res) {
          this.presentToast('Successfully deleted');
          this.schedules.splice(this.index, 1);
        }
      });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  public async edit(id) {
    window.sessionStorage.setItem('some_id', id);
    // this.router.navigate(['/status']);
    // console.log(this.getID);
    const modal = await this.modalController.create({ component: EditPage });
    modal.onDidDismiss().then((data) => {
      this.ngOnInit();
    });

    return await modal.present();
  }

  Search(event) {
    // console.log(event.detail.value);
    if (event.detail.value == '') {
      this.getRequests();
    } else {
      this.schedules = this.schedules.filter((res) => {
        return (
          res.account_name
            .toLocaleLowerCase()
            .match(event.detail.value.toLocaleLowerCase()) ||
          res.appointment_date
            .toLocaleLowerCase()
            .match(event.detail.value.toLocaleLowerCase()) ||
          res.schedule_status
            .toLocaleLowerCase()
            .match(event.detail.value.toLocaleLowerCase())
        );
      });
    }
  }
}
