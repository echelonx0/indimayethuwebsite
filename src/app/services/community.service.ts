import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommunityProject } from '../models/community-projects';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  communityProjectsCollection: AngularFirestoreCollection<any>;
  projectDoc: AngularFirestoreDocument<CommunityProject>;
  communityProjects: Observable<CommunityProject[]>;
  project: Observable<CommunityProject>;


  //Requests for help
  messageDoc: AngularFirestoreDocument<any>;
  helpMessagingCollection: AngularFirestoreCollection<any>;
  requestsForHelp: Observable<any[]>;
  request: Observable<any>;

  //For responses
  chatsCollection: AngularFirestoreCollection<any>;


  constructor(private afs: AngularFirestore) {
    this.communityProjectsCollection = this.afs.collection('cs');
    this.helpMessagingCollection = this.afs.collection('messages');
    this.chatsCollection = this.afs.collection('chats');
   }

  //Allow user to ask new question
  createNewCommunityProject(project: any) {
    this.communityProjectsCollection.add(project);
  }



    // Get all community submitted to the platform
    getAllCommunityProjects(): Observable<CommunityProject[]> {
      this.communityProjects = this.communityProjectsCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as CommunityProject;
          data.id = action.payload.doc.id;
          return data;
        });
      }));  
      return this.communityProjects;
    }
  
    moveToBeingHandled(document: string){
      this.helpMessagingCollection.doc(document).update({
        needsHelp: false
      })
    }

        //Retrieve the individual project
        getCommunityProject(id: string): Observable<CommunityProject> {
          this.projectDoc = this.afs.doc<CommunityProject>(`cs/${id}`);
          this.project = this.projectDoc.snapshotChanges().pipe(map(action => {
            if(action.payload.exists === false) {
              return null;
            } else {
              const data = action.payload.data() as CommunityProject;
              //data.id = action.payload.id;
              return data;
            }
          }));
      
          return this.project;
        }

            // Get all questions submitted to the platform
    getAllMessages(): Observable<any[]> {

      this.helpMessagingCollection = this.afs.collection('messages', ref => ref.orderBy('dateSent', 'desc').where("needsHelp", "==", true).where('solved', '==', false));
    
      this.requestsForHelp = this.helpMessagingCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  
      return this.requestsForHelp;
    }

            //Retrieve the individual message
            getChat(id: string): Observable<any> {
              this.messageDoc = this.afs.doc<any>(`messages/${id}`);
              this.request = this.messageDoc.snapshotChanges().pipe(map(action => {
                if(action.payload.exists === false) {
                  return null;
                } else {
                  const data = action.payload.data() as any;
                  //data.id = action.payload.id;
                  return data;
                }
              }));
          
              return this.request;
            }

                       //Respond to chat
            respondToChat(id: string, response: any) {

            // this.chatsCollection = this.afs.collection<any>(`chats/${id}`);
            this.chatsCollection.doc(id).set(response);
            return       this.helpMessagingCollection.add(response);
            

            }
      
  

}
