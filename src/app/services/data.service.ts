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
  journalDoc: AngularFirestoreDocument<Journal>;
  journals: Observable<Journal[]>;
  moods: Observable<Moods[]>;

  journal: Observable<Journal>;
  mood: Observable<Moods>;

  //Catch all
  data: Observable<any>;
  firebaseDoc: AngularFirestoreDocument<any>;
  

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


  getSingleEntry(id: string): Observable<Journal> {
    this.journalDoc = this.afs.doc<Journal>(`journal_entries/${id}`);
    this.journal = this.journalDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Journal;
        //data.id = action.payload.id;
        return data;
      }
    }));

    return this.journal;
  }

  //This is a universal method to get any entry in any collection
  //I pass in both the collection and the ID of the document
  getEntry(id: string, collection: string): Observable<any> {
    this.firebaseDoc = this.afs.doc<any>(`${collection}/${id}`);
    this.data = this.firebaseDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as any;
        //data.id = action.payload.id;
        return data;
      }
    }));

    return this.data;
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
