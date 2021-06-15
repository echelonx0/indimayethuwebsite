import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  journallingCollection: AngularFirestoreCollection<any>;
  moodDoc: AngularFirestoreDocument<any>;
  journalEntries: Observable<any[]>;
  mood: Observable<any>;


  constructor(private afs: AngularFirestore) { 
    this.journallingCollection = this.afs.collection('journal_entries');
  }


    
  getTransactions(id: string): Observable<any[]> {
    this.journallingCollection = this.afs.collection<any>('journal_entries', ref => ref.where('uid', '==', id ).orderBy('entryDate', 'desc'));
    this.journalEntries = this.journallingCollection.snapshotChanges().pipe(map(changes => {
    
      

    // return this.client;
    return changes.map(action => {
      const data = action.payload.doc.data() as any;
      data.id = action.payload.doc.id;
      return data;
    });
  }));

  return this.journalEntries; 
  }

  getMoods(id: string): Observable<any[]> {
    this.journallingCollection = this.afs.collection<any>('mood_entries', ref => ref.where('uid', '==', id ).orderBy('entryDate', 'desc'));
    this.journalEntries = this.journallingCollection.snapshotChanges().pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.data() as any;
      data.id = action.payload.doc.id;
      return data;
    });
  }));

  return this.journalEntries; 
  }


              //Retrieve the individual mood entry
              getMoodEntry(id: string): Observable<any> {
                this.moodDoc = this.afs.doc<any>(`mood_entries/${id}`);
                this.mood = this.moodDoc.snapshotChanges().pipe(map(action => {
                  if(action.payload.exists === false) {
                    return null;
                  } else {
                    const data = action.payload.data() as any;
                    //data.id = action.payload.id;
                    return data;
                  }
                }));
            
                return this.mood;
              }

                            //Retrieve the individual journal entry
                            getJournalEntry(id: string): Observable<any> {
                              this.moodDoc = this.afs.doc<any>(`journal_entries/${id}`);
                              this.mood = this.moodDoc.snapshotChanges().pipe(map(action => {
                                if(action.payload.exists === false) {
                                  return null;
                                } else {
                                  const data = action.payload.data() as any;
                                  //data.id = action.payload.id;
                                  return data;
                                }
                              }));
                          
                              return this.mood;
                            }


}
