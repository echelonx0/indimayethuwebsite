import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/users';


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  clientsCollection: AngularFirestoreCollection<User>;
  clients: Observable<User[]>;

  constructor(private afs: AngularFirestore) { 
    this.clientsCollection = this.afs.collection('clients');
  }


  getClients(): Observable<User[]> {
    // Get clients with the id
    this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as User;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return this.clients; 
  }

  //filter the clients later
  filterBy(search: string) {
    this.clients = this.afs.collection('clients', ref => ref.where('firstName' || 'lastName','==', search )).valueChanges()

    return this.clients;
};



}
