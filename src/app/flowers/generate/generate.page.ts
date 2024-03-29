import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { FlowersService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.page.html',
  styleUrls: ['./generate.page.scss'],
})
export class GeneratePage implements OnInit {
  topFlowers: any;
  primary: any;
  primary_price: any;
  labelText: any;

  cpt = 0;

  combination: any;
  content: any;

  Flowers: any;

  floral = [];
  option: any;
  permutations: any;
  constructor(
    private fs: FlowersService,
    private elementRef: ElementRef,
    private dataService: DataService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    console.log(history.state.data);
    this.primary = history.state.data.flower_name;
    this.primary_price = history.state.data.price;
    this.option = history.state.data.quantity;
    this.dataService
      .processData(btoa('get_flowers').replace('=', ''), null, 2)
      .subscribe(
        (dt: any) => {
          let load = this.dataService.decrypt(dt.a);
          // console.log(load);
          this.Flowers = load.payload.data;
          for (let i = 0; i < this.Flowers.length; i++) {
            // console.log(this.Flowers[i]['flower_name']);
            this.floral.push(this.Flowers[i]['flower_name']);
          }
          // console.log(this.permutation(this.floral, 2));
          // Setup All Combinations with repetition
          this.permutations = this.permutation(this.floral, 2);
          // console.log(this.permutations);
          // console.log(this.floral[0]);

          if (this.option == 6) {
            this.topFlowers = this.fs.six(this.primary, this.floral[this.cpt]);
            this.content = this.topFlowers;
          } else if (this.option == 9) {
            this.topFlowers = this.fs.nine(this.primary, this.floral[this.cpt]);
            this.content = this.topFlowers;
          } else if (this.option == 12) {
            this.topFlowers = this.fs.twelve(
              this.primary,
              this.permutations[this.cpt]
            );
            this.content = this.topFlowers;
          }
        },
        (er) => {
          console.log('Invalid Inputs', er);
        }
      );
  }

  ngOnInit() {
    // Setting HTML Element
    // this.combination = this.topFlowers.shift();
  }

  // screen() {
  //   // alert('ddd');
  //   const render = (node) =>
  //     domtoimage
  //       .toPng(node)
  //       .then(async (dataUrl) => {
  //         console.log(performance.now() - pf);
  //         const img = new Image();
  //         img.src = dataUrl;
  //         // $('body').append(img);
  //         console.log(dataUrl);
  //         this.orderPayload.user_id = '1';
  //         this.orderPayload.order_img = dataUrl;
  //         this.res = await this.dataService.newData(this.orderPayload);
  //         if (this.res.status == 200) {
  //           console.log(this.res.message);
  //         } else {
  //           console.log(this.res.message);
  //         }
  //       })
  //       .catch((error) => console.error('oops, something went wrong!', error));

  //   const foo = document.getElementById('foo');

  //   var pf = performance.now();
  //   render(foo);
  // }

  gen() {
    if (this.option == 6) {
      if (this.cpt < this.floral.length - 1) {
        this.cpt++;
      } else {
        this.cpt = 0;
      }
      this.topFlowers = this.fs.six(this.primary, this.floral[this.cpt]);
      this.content = this.topFlowers;
    } else if (this.option == 9) {
      if (this.cpt < this.floral.length - 1) {
        this.cpt++;
      } else {
        this.cpt = 0;
      }
      this.topFlowers = this.fs.nine(this.primary, this.floral[this.cpt]);
      this.content = this.topFlowers;
    } else if (this.option == 12) {
      if (this.cpt < this.permutations.length - 1) {
        this.cpt++;
      } else {
        this.cpt = 0;
      }
      this.topFlowers = this.fs.twelve(
        this.primary,
        this.permutations[this.cpt]
      );
      this.content = this.topFlowers;
    }
  }

  // rev() {}
  // fwd() {
  //   // this.combination = this.topFlowers.shift();
  //   // console.log(this.combination.template);
  //   // this.content = this.combination.template;
  //   if (this.option == 6) {
  //     this.topFlowers = this.fs.six(this.primary, this.floral.shift());
  //     this.content = this.topFlowers;
  //   } else if (this.option == 9) {
  //     this.topFlowers = this.fs.nine(this.primary, this.floral.shift());
  //     this.content = this.topFlowers;
  //   } else if (this.option == 12) {
  //     this.topFlowers = this.fs.twelve(this.primary, this.permutations.shift());
  //     this.content = this.topFlowers;
  //   }
  // }

  permutation(list, maxLen) {
    // Copy initial values as arrays
    var perm = list.map(function (val) {
      return [val];
    });
    // Our permutation generator
    var generate = function (perm, maxLen, currLen) {
      // Reached desired length
      if (currLen === maxLen) {
        return perm;
      }
      // For each existing permutation
      for (var i = 0, len = perm.length; i < len; i++) {
        var currPerm = perm.shift();
        // Create new permutation
        for (var k = 0; k < list.length; k++) {
          perm.push(currPerm.concat(list[k]));
        }
      }
      // Recurse
      return generate(perm, maxLen, currLen + 1);
    };
    // Start with size 1 because of initial values
    return generate(perm, maxLen, 1);
  }

  confirm() {
    if (this.option == 6) {
      let price = 0;

      console.log(this.primary, this.primary_price);

      this.Flowers.forEach((element) => {
        if (element.flower_name == this.floral[this.cpt]) {
          price = element.flower_price;
        }
      });

      console.log(this.floral[this.cpt], price);

      this.router.navigate(['confirmation'], {
        state: {
          data: {
            quantity: 6,
            primary: this.primary,
            primary_price: this.primary_price,
            secondary: this.floral[this.cpt],
            secondary_price: price,
          },
        },
      });
    } else if (this.option == 9) {
      let price = 0;

      console.log(this.primary, this.primary_price);

      this.Flowers.forEach((element) => {
        if (element.flower_name == this.floral[this.cpt]) {
          price = element.flower_price;
        }
      });

      console.log(this.floral[this.cpt], price);
      this.router.navigate(['confirmation'], {
        state: {
          data: {
            quantity: 9,
            primary: this.primary,
            primary_price: this.primary_price,
            secondary: this.floral[this.cpt],
            secondary_price: price,
          },
        },
      });
    } else if (this.option == 12) {
      // console.log(this.primary);
      // console.log(this.primary_price);

      // console.log(this.permutations[this.cpt]);

      let secondary_price = 0;
      let tertiary_price = 0;

      console.log(this.primary, this.primary_price);

      // console.log(this.permutations[this.cpt]);
      this.permutations.forEach((element) => {
        if (element == this.permutations[this.cpt]) {
          // finding price of secondary flower

          this.Flowers.forEach((secondary) => {
            if (secondary.flower_name == element[0]) {
              secondary_price = secondary.flower_price;
            }
          });
          // finding price of tertiary flower
          this.Flowers.forEach((tertiary) => {
            if (tertiary.flower_name == element[1]) {
              tertiary_price = tertiary.flower_price;
            }
          });
        }
      });
      console.log('Secondary: ', secondary_price);
      console.log('Tertiary: ', tertiary_price);

      this.router.navigate(['confirmation'], {
        state: {
          data: {
            quantity: 12,
            primary: this.primary,
            primary_price: this.primary_price,
            secondary: this.permutations[this.cpt][0],
            secondary_price: secondary_price,
            tertiary: this.permutations[this.cpt][1],
            tertiary_price: tertiary_price,
          },
        },
      });
    }
  }
}
