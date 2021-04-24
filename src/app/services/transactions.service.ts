import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  transactionsCollection: AngularFirestoreCollection<Transaction>;
  transactions: Observable<Transaction[]>;


  constructor(private afs: AngularFirestore) { 
    this.transactionsCollection = this.afs.collection('transactions');
  }


    
  getTransactions(id: string): Observable<Transaction[]> {
    this.transactionsCollection = this.afs.collection<Transaction>('transactions', ref => ref.where('userID', '==', id ).orderBy('transactionDate', 'desc'));
    this.transactions = this.transactionsCollection.snapshotChanges().pipe(map(changes => {
    
      

    // return this.client;
    return changes.map(action => {
      const data = action.payload.doc.data() as Transaction;
      data.id = action.payload.doc.id;
      return data;
    });
  }));

  return this.transactions; 
  }

}
