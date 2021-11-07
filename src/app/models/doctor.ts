export class Doctor {
  doctor_name: string;
  doctor_email: string;
  doctor_password: string;
  doctor_specialization: string;
  doctor_address: string;
  registration_month: string;
  doc_image: string;

  constructor() {
    this.doctor_name = '';
    this.doctor_email = '';
    this.doctor_password = '';
    this.doctor_specialization = '';
    this.doctor_address = '';
    this.registration_month = '';
    this.doc_image = '';
  }
}
