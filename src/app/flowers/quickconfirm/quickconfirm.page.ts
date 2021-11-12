import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quickconfirm',
  templateUrl: './quickconfirm.page.html',
  styleUrls: ['./quickconfirm.page.scss'],
})
export class QuickconfirmPage implements OnInit {
  link = '../../../assets/quick/';

  total: any;

  user_obj: any;
  userId: any;
  bouquet_name: any;

  constructor(
    private userService: UserService,
    private dataService: DataService,
    public router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    console.log(history.state.data);

    this.link = this.link + history.state.data.quick_name + '.png';
    this.bouquet_name = history.state.data.quick_name;
    this.total = history.state.data.quick_price;
    this.user_obj = this.userService.getUser();
    this.userId = this.user_obj.user_id;
  }

  add_to_cart() {
    let user_id = this.userId;
    let order_flower = this.bouquet_name;
    let order_totalprice = this.total;

    this.dataService
      .processData(
        btoa('add_to_cart').replace('=', ''),
        {
          user_id,
          order_flower,
          quantity: null,
          main_flower: null,
          secondary_flower: null,
          tertiary_flower: null,
          order_totalprice,
        },
        2
      )
      .subscribe(
        (dt: any) => {
          // console.log(dt.a);
          let load = this.dataService.decrypt(dt.a);
          console.log(load);
          this.router.navigate(['tabs/tab4']);
        },
        (er) => {
          console.log('Invalid Inputs');
        }
      );
  }
}
