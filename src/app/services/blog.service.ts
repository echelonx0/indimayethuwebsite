import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogPost } from '../models/blog-posts';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogsCollection: AngularFirestoreCollection<any>;
  blogDoc: AngularFirestoreDocument<BlogPost>;
  blogPosts: Observable<BlogPost[]>;
  post: Observable<BlogPost>;

  constructor(private afs: AngularFirestore) {
    this.blogsCollection = this.afs.collection('blogs');
   }

  //Allow user to ask new question
  publishBlogPost(question: any) {
    this.blogsCollection.add(question);
  }



    // Get all questions submitted to the platform
    getAllBlogPosts(): Observable<BlogPost[]> {
    
      this.blogPosts = this.blogsCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BlogPost;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  
      return this.blogPosts;
    }
  
        //Retrieve the question
        getBlogPost(id: string): Observable<BlogPost> {
          this.blogDoc = this.afs.doc<BlogPost>(`blogs/${id}`);
          this.post = this.blogDoc.snapshotChanges().pipe(map(action => {
            if(action.payload.exists === false) {
              return null;
            } else {
              const data = action.payload.data() as BlogPost;
              //data.id = action.payload.id;
              return data;
            }
          }));
      
          return this.post;
        }
  

}
