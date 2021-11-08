import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OTPPage implements OnInit {
  OTP: any;

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  onOtpChange(e) {
    this.OTP = e;
  }

  submit() {
    this.popoverController.dismiss({
      OTP: this.OTP,
    });
  }
}
