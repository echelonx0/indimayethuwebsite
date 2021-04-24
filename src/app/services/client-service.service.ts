
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } 
from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Clients } from '../models/Clients';



import 'firebase/firestore';
import firebase from 'firebase';

// import { Clients } from '../models/Clients';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ClientServiceService {
  clientsCollection: AngularFirestoreCollection<Clients>;
  clientDoc: AngularFirestoreDocument<Clients>;
  transactionCollection: AngularFirestoreCollection<any>;
  clients: Observable<Clients[]>;
  client: Observable<Clients>;

  constructor(private afs: AngularFirestore) { 
    this.clientsCollection = this.afs.collection('clients');
  }

  getClients(): Observable<Clients[]> {
    // Get clients with the id
    this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Clients;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return this.clients; 
  }

  
  newClient(client: Clients) {
    this.clientsCollection.add(client);
  }


  
  getClient(id: string): Observable<Clients> {
    this.clientDoc = this.afs.doc<Clients>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Clients;
        data.id = action.payload.id;
        return data;
      }
    }));

    return this.client;
  }

  
  updateClient(client: Clients) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }


  //enter a deposit into the transactions colection
  doDeposit(newBalance: number, client: Clients, depositAmount: number, transactionType: string) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.transactionCollection = this.afs.collection(`transactions`);
    this.clientDoc.update(
      {
        "accountBalance" : newBalance
      }
    );
    this.transactionCollection.add(
      {
        "userID": client.id,
        "transactionType": transactionType,
        "transactionAmount": depositAmount,
        "transactionDate": firebase.firestore.FieldValue.serverTimestamp(), 
      }
    )
  }


  deleteClient(client: Clients) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }



}
