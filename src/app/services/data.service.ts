import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Journal } from '../models/journal_entries';
import { Moods } from '../models/moods';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  journalCollection: AngularFirestoreCollection<Journal>;
  moodsCollection: AngularFirestoreCollection<Moods>;
  journals: Observable<Journal[]>;
  moods: Observable<Moods[]>;
  

  constructor(private afs: AngularFirestore) { 
    // this.journalCollection = this.afs.collection('journal_entries');
  }

  getJournals(id: string): Observable<Journal[]> {

    this.journalCollection = this.afs.collection('journal_entries', ref => ref.orderBy('entrydate', 'asc').where("uid", "==", id));
    // Get clients with the id
    this.journals = this.journalCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Journal;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return this.journals; 
  }


  getMyMoods(id: string): Observable<Moods[]> { 

    
    this.moodsCollection = this.afs.collection('mood_entries', ref => ref.orderBy('entryDate', 'asc').where("uid", "==", id));
    // Get clients with the id
    this.moods = this.moodsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Moods;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return this.moods;
  }

}
