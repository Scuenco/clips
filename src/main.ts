import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

firebase.initializeApp(environment.firebase)
let appInit = false

firebase.auth().onAuthStateChanged(() => {
  if (!appInit) { // so it is guarranteed to only run once
    platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  }
  appInit = true
})


