import { Injectable } from '@angular/core';
import { About } from '../models/about';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  aboutCollection: AngularFirestoreCollection<About>;
  clientDoc: AngularFirestoreDocument<About>;
  clients: Observable<About[]>;
  about: Observable<About>;

  constructor(private afs: AngularFirestore) {
    this.aboutCollection = this.afs.collection('aboutUsPage');
    
   }

  getClient(id: string): Observable<About> {
    this.clientDoc = this.afs.doc<About>(`aboutUsPage/${id}`);
    this.about = this.clientDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as About;
       // data.id = action.payload.id;
        return data;
      }
    }));

    return this.about;
  }


  updateAboutInfo(about: About) {
    this.clientDoc = this.afs.doc(`aboutUsPage/${'8Ii4ZgE03z2gape6zrST'}`);
    this.clientDoc.update(about);
  }




}
