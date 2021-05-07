import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';

import { map, switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';


@Injectable()
export class AuthService {

  //Begin User Management Here. I define the app user
  appUser$: Observable<AppUser>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore ) { 

    this.appUser$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // If the user is logged in, return the user details.
        if (user) {
          return this.afs.doc<AppUser>(`users/${user.uid}`).valueChanges();
        } else {
          // If the user is NOT logged in, return null.
          return of(null);
        }
      })
    );
    
  }

  

  login(email: string, password: string) {

    return this.afAuth.setPersistence('session').then(_ => {
      //return this.afAuth.signInWithEmailAndPassword(email, password);

      return new Promise((resolve, reject) => {
      
        this.afAuth.signInWithEmailAndPassword(email, password)
          .then(userData => resolve(userData),
        err => reject(err))
      });
      
    });


  }

  
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
      err => reject(err))
    });
  }

  //getting errors with the below
  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  //so I changed it to this. Let's see if it works


  // getAuth() {
  //   return this.afAuth.authState;
  // }


  logout() {
    this.afAuth.signOut();
  }

  
}