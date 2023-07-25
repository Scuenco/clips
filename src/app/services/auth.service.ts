import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean>

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) { 
    this.usersCollection = db.collection('users')
    auth.user.subscribe(console.log) // log the value emitted by this observable.
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user) // typecasts user into a boolean value
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(2000)
    )
  }

  // a method for creating users
  public async createUser(userData: IUser) {

    if(!userData.password) {
      throw new Error("Password not provided!")
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email, userData.password 
    )

    if (!userCred.user) {
      throw new Error("User can't be found.")
    }
    // We use doc() to assign a unique Id to the document unlike add().
    // Function to insert form data.
    await this.usersCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    })

    // store displayname in the service
    await userCred.user.updateProfile({
      displayName: userData.name
    })
  }
}
