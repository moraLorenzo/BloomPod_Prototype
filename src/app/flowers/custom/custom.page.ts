import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.page.html',
  styleUrls: ['./custom.page.scss'],
})
export class CustomPage implements OnInit {
  Flowers = [{ name: 'rose' }, { name: 'sunflower' }, { name: 'lily' }];

  constructor() {}

  ngOnInit() {}
}
