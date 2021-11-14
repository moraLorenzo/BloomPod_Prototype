import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import { DefaultImage } from '../data-schema';

import * as CryptoJS from 'crypto-js';
import aes from 'crypto-js/aes';
import encHex from 'crypto-js/enc-hex';
import padZeroPadding from 'crypto-js/pad-zeropadding';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  version_number = '1.1.0';

  private keyString = new DefaultImage();
  constructor(private http: HttpClient, private userService: UserService) {}

  request(endpoint, data) {
    try {
      return this.http
        .post(this.userService.apiLink + endpoint, JSON.stringify(data))
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  processData(api: string, load: any, sw: number) {
    // console.log(load);

    let payload = {
      load: load,
      token: this.userService.getToken(),
      userid: this.userService.getUserID(),
    };
    switch (sw) {
      case 1:
        return this.http.post(
          this.userService.apiLink + api,
          this.convertmessage(
            unescape(encodeURIComponent(JSON.stringify(payload)))
          )
        );
        break;
      case 2:
        return this.http.post(
          this.userService.apiLink + api,
          this.convertmessage(
            unescape(encodeURIComponent(JSON.stringify(load)))
          )
        );
        break;
      case 3:
        return this.http.post(this.userService.apiLink + api, load);
        break;
      case 4:
        return this.http.get(this.userService.apiLink + api, load);
        break;
      default:
        break;
    }
  }

  decrypt(encryptedString) {
    let key = this.keyString.defaultmessage;
    let encryptMethod = 'AES-256-CBC';
    let encryptLength = parseInt(encryptMethod.match(/\d+/)[0]);
    let json = JSON.parse(
      CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encryptedString))
    );
    let salt = CryptoJS.enc.Hex.parse(json.salt);
    let iv = CryptoJS.enc.Hex.parse(json.iv);

    let encrypted = json.ciphertext;

    let iterations = parseInt(json.iterations);
    if (iterations <= 0) {
      iterations = 999;
    }
    let encryptMethodLength = encryptLength / 4;
    let hashKey = CryptoJS.PBKDF2(key, salt, {
      hasher: CryptoJS.algo.SHA512,
      keySize: encryptMethodLength / 8,
      iterations: iterations,
    });

    let decrypted = CryptoJS.AES.decrypt(encrypted, hashKey, {
      mode: CryptoJS.mode.CBC,
      iv: iv,
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }

  private convertmessage(msg) {
    let keyString = this.userService.genHexString(32);
    let ivString = this.userService.genHexString(32);
    let key = encHex.parse(keyString);
    let iv = encHex.parse(ivString);

    return (
      this.keyString.generateSalt() +
      iv +
      key +
      aes.encrypt(msg, key, { iv: iv, padding: padZeroPadding }).toString()
    );
  }

  ger_ver() {
    return this.version_number;
  }

  public async updateImage(update: any) {
    const formData = new FormData();
    formData.append('order_id', update.order_id);

    const URL = 'http://192.168.100.128/bloompod_api/dXBkYXRlX29yZGVy';

    if (update.payment) {
      const posterFile = await fetch(update.payment);
      const blob = await posterFile.blob();
      formData.append('payment', blob);
    }
    return await this.http.post(URL, formData).toPromise();
  }
}
