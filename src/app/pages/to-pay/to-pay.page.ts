import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-to-pay',
  templateUrl: './to-pay.page.html',
  styleUrls: ['./to-pay.page.scss'],
})
export class ToPayPage implements OnInit {
  orders: any;
  constructor(private userService: UserService, public router: Router) {  }

  ngOnInit() {
    this.orders = this.userService.getOrders();
  }

  getorder() {
    console.log(this.orders);
  }

  navHistory(order) {
    console.log(order);
  }

  back(){
    this.router.navigate(['tabs/tab4']);
  }
}
