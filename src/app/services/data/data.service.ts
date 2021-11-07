import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url: string = 'http://192.168.100.128/elective1/';

  constructor(private http: HttpClient) {}

  public async getData() {
    const URL = 'http://192.168.100.128/elective1/getdoctors';
    const data = '';
    const doctors = await this.http.post(URL, JSON.stringify(data)).toPromise();
    // const test = await this.TestPromise();
    console.log('Doctors: ', doctors);
  }

  public async newData(doctor: Doctor): Promise<Doctor> {
    const formData = new FormData();
    formData.append('doctor_name', doctor.doctor_name);
    formData.append('doctor_email', doctor.doctor_email);
    formData.append('doctor_password', doctor.doctor_password);
    formData.append('doctor_specialization', doctor.doctor_specialization);
    formData.append('doctor_address', doctor.doctor_address);
    formData.append('registration_month', doctor.registration_month);

    const URL = 'http://192.168.100.128/elective1/doctorimage';

    if (doctor.doc_image) {
      const posterFile = await fetch(doctor.doc_image);
      const blob = await posterFile.blob();
      formData.append('doc_image', blob);
    }
    return (await this.http.post(URL, formData).toPromise()) as Doctor;
  }

  public async processData(endpoint, data) {
    try {
      return this.http
        .post(this.url + endpoint, JSON.stringify(data))
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  formData(endpoint, data) {
    return this.http.post(this.url + endpoint, data);
  }

  // public TestPromise() {
  //   return new Promise((resolve, reject) => {});
  // }
}
