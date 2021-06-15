
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } 
from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




import 'firebase/firestore';
import firebase from 'firebase';
import { User } from '../models/users';

// import { Clients } from '../models/Clients';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ClientServiceService {
  clientsCollection: AngularFirestoreCollection<User>;
  clientDoc: AngularFirestoreDocument<User>;
  transactionCollection: AngularFirestoreCollection<any>;
  clients: Observable<User[]>;
  client: Observable<User>;

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



  
  getClient(id: string): Observable<User> {
    this.clientDoc = this.afs.doc<User>(`users/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as User;
        data.id = action.payload.id;
        return data;
      }
    }));

    return this.client;
  }

  
  updateClient(client: User) {
    this.clientDoc = this.afs.doc(`users/${client.id}`);
    this.clientDoc.update(client);
  }



  deleteClient(client: User) {
    this.clientDoc = this.afs.doc(`users/${client.id}`);
    this.clientDoc.delete();
  }



}
