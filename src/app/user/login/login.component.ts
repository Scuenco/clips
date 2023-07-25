import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }
  showAlert = false
  alertMsg = 'Please wait, we are logging you in.'
  alertColor = 'blue'
  inSubmission = false

  constructor(
    private auth: AngularFireAuth,
  ) {}
  
  async login() {
    this.showAlert = true
    this.alertMsg = 'Please wait, we are logging you in.'
    this.alertColor = 'blue'
    this.inSubmission = true
    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
        )
    } catch(e) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'An unexpected error occurred.'
      console.log(e)
      return
    }
    this.alertColor = 'green'
    this.alertMsg = 'Login successful.'
  }
}
