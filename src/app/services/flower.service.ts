import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'safeHtml',
})
@Injectable({
  providedIn: 'root',
})
export class FlowersService implements PipeTransform {
  public flowers: any;
  greet = 'good day';
  img: any;
  constructor(private _sanitizer: DomSanitizer) {}
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

  combination(mainflower) {
    // this.img = './../../../../assets/flowers/' + mainflower + '.png';
    this.img = mainflower;
    console.log(mainflower);
    let random = ['sunflower', 'lily'];

    this.flowers = [
      {
        template: this._sanitizer.bypassSecurityTrustHtml(
          ' <img src="./../../../../assets/base/bouquet-by-three.png" style="width: 250px; height:250px;" alt="bouquet" /><img src="./../../../assets/flowers/' +
            `${this.img}` +
            '.png" style="width: 50px;position: absolute;left: 160px;top: 75px;z-index: 1;"/><img src="./../../../assets/flowers/' +
            `${this.img}` +
            '.png" style="width: 50px;position: absolute;right: 120px;top: 115px;z-index: 1;"/><img src="./../../../assets/flowers/' +
            `${this.img}` +
            '.png" style="width: 50px;position: absolute;left: 115px;top: 90px;z-index: 1;"/>'
        ),
      },
      {
        template: this._sanitizer.bypassSecurityTrustHtml(
          ' <img src="./../../../../assets/base/bouquet-by-five.png" style="width: 250px; height:250px;" alt="bouquet" /><img src="./../../../assets/flowers/' +
            `${this.img}` +
            '.png" style="width: 50px;position: absolute;left: 150px;top: 55px;z-index: 1;"/><img src="./../../../assets/flowers/' +
            `${random[Math.floor(Math.random() * 2)]}` +
            '.png" style="width: 50px;position: absolute;right: 100px;top: 85px;z-index: 1;"/><img src="./../../../assets/flowers/' +
            `${random[Math.floor(Math.random() * 2)]}` +
            '.png" style="width: 50px;position: absolute;left: 110px;top: 80px;z-index: 1;"/><img src="./../../../assets/flowers/' +
            `${this.img}` +
            '.png" style="width: 50px;position: absolute;right: 115px;top: 120px;z-index: 1;"/><img src="./../../../assets/flowers/' +
            `${this.img}` +
            '.png" style="width: 50px;position: absolute;left: 115px;top: 120px;z-index: 1;"/>'
        ),
      },
    ];

    // this.flowers.push({
    //   template: this._sanitizer.bypassSecurityTrustHtml(
    //     '<div class="content"><img style="width: 30%; border-radius: 50%" src="./../../../../assets/flowers/' +
    //       `${this.img}` +
    //       '.png"><h1 style="font-family:Inter semi-bold">' +
    //       `${this.greet}` +
    //       '</h1>' +
    //       '<p>This is a paragraph of text.</p><p><strong>Note:</strong> If you dsdsdon\'t escape "quotes" properly, it will not work.</p></div>'
    //   ),
    // });

    for (var i = 0; i < this.flowers.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (this.flowers.length - i));

      var temp = this.flowers[j];
      this.flowers[j] = this.flowers[i];
      this.flowers[i] = temp;
    }

    // console.log(this.flowers[0]);
    return this.flowers;
  }

  six(mainflower, secondary) {
    console.log(secondary);
    this.img = mainflower;

    let random = ['sunflower', 'lily'];

    let template = this._sanitizer.bypassSecurityTrustHtml(
      ' <img src="./../../../../assets/base/bouquet-by-six.png" style="width: 250px; height:250px;" alt="bouquet" /><img src="./../../../assets/flowers/' +
        `${mainflower}` +
        '.png" style="width: 50px;position: absolute;left: 150px;top: 90px;z-index: 2;"/><img src="./../../../assets/flowers/' +
        `${mainflower}` +
        '.png" style="width: 50px;position: absolute;left: 100px;top: 70px;z-index: 1;"/><img src="./../../../assets/flowers/' +
        `${mainflower}` +
        '.png" style="width: 50px;position: absolute;left: 200px;top: 80px;z-index: 1;"/><img src="./../../../assets/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 150px;top: 50px;z-index: 1;"/><img src="./../../../assets/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 120px;top: 130px;z-index: 1;"/><img src="./../../../assets/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 170px;top: 130px;z-index: 1;"/>'
    );

    return template;
  }

  nine(mainflower, secondary) {
    console.log(secondary);
    this.img = mainflower;

    let random = ['sunflower', 'lily'];

    let template = this._sanitizer.bypassSecurityTrustHtml(
      ' <img src="./../../../../assets/base/bouquet-by-nine.png" style="width: 250px; height:250px;" alt="bouquet" /><img src="./../../../assets/flowers/' +
        `${mainflower}` +
        '.png" style="width: 50px;position: absolute;left: 150px;top: 110px;z-index: 2;"/><img src="./../../../assets/flowers/' +
        `${mainflower}` +
        '.png" style="width: 50px;position: absolute;left: 125px;top: 80px;z-index: 2;"/><img src="./../../../assets/flowers/' +
        `${mainflower}` +
        '.png" style="width: 50px;position: absolute;left: 175px;top: 80px;z-index: 2;"/><img src="./../../../assets/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 185px;top: 45px;z-index: 1;"/><img src="./../../../assets/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 115px;top: 45px;z-index: 1;"/><img src="./../../../assets/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 90px;top: 90px;z-index: 1;"/><img src="./../../../assets/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;right: 70px;top: 90px;z-index: 1;"/><img src="./../../../assets/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 110px;bottom: 90px;z-index: 1;"/><img src="./../../../assets/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;right: 90px;bottom: 90px;z-index: 1;"/>'
    );

    return template;
  }

  twelve(mainflower, permutation) {
    // console.log(permutation[0]);
    // console.log(permutation[1]);
    let secondary = permutation[0];
    let tertiary = permutation[1];
    this.img = mainflower;

    let random = ['sunflower', 'lily'];

    let template = this._sanitizer.bypassSecurityTrustHtml(
      ' <img src="./../../../../assets/base/bouquet-by-twelve.png" style="width: 250px; height:250px;" alt="bouquet" /><img src="./../../../assets/flowers/' +
        `${mainflower}` +
        '.png" style="width: 45px;position: absolute;left: 150px;top: 80px;z-index: 2;"/><img src="./../../../assets/flowers/' +
        `${mainflower}` +
        '.png" style="width: 45px;position: absolute;left: 140px;bottom: 90px;z-index: 2;"/><img src="./../../../assets/flowers/' +
        `${mainflower}` +
        '.png" style="width: 45px;position: absolute;left: 125px;top: 100px;z-index: 2;"/><img src="./../../../assets/flowers/' +
        `${mainflower}` +
        '.png" style="width: 45px;position: absolute;right: 125px;top: 100px;z-index: 2;"/><img src="./../../../assets/flowers/' +
        `${secondary}` +
        '.png" style="width: 45px;position: absolute;left: 85px;top: 100px;z-index: 1;"/><img src="./../../../assets/flowers/' +
        `${secondary}` +
        '.png" style="width: 45px;position: absolute;left: 100px;top: 65px;z-index: 1;"/>'
    );

    return template;
  }
}
