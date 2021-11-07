import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input('name') name: string;
  account_name: string;
  account_email: string;
  account_gender: string;
  height: string;
  weight: string;
  bloodtype: string;

  constructor(
    public popoverController: PopoverController,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // console.log('id', this.name);
    // console.log('status', this.status);
    this.getUser();
  }

  public async getUser() {
    await this.dataService
      .processData('getuser', {
        account_name: this.name,
      })
      .then(async (res: any) => {
        // console.log(res);
        this.account_name = res.data[0]['account_name'];
        this.account_email = res.data[0]['account_email'];
        this.account_gender = res.data[0]['account_gender'];
        this.height = res.data[0]['account_height'];
        this.weight = res.data[0]['account_weight'];
        this.bloodtype = res.data[0]['account_bloodtype'];
      });
  }
}
