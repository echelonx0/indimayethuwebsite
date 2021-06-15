import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { ContentChange, EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/storage';

 //Solution to fieldvalue problem
 import  firebase from 'firebase/app';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styles: [
  ]
})
export class PublishComponent implements OnInit {

  authorUID = '';
  user;
  isSubmitted: boolean;
  disableBalanceOnAdd: boolean;

  imgSrc: string;
  selectedImage: any = null;
  showLoading: boolean = false;
  showDone: boolean = false;

  
  isOurPartner = false;  

  formTemplate = new FormGroup({
    id: new FormControl(new FormControl('')),
    author: new FormControl (''),
    category: new FormControl(''),
    title: new FormControl (''),
    subject: new FormControl(''),
    post: new FormControl(''),
    date: new FormControl (firebase.firestore.FieldValue.serverTimestamp()),
    comments: new FormArray([]),
    image: new FormControl('')
    
  })


  constructor(

    private blogService: BlogService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private storage: AngularFireStorage, 
  ) { }

  ngOnInit(): void {

    this.resetForm();

    this.authService.getAuth().subscribe(auth => {
      if(auth) {
      
        this.authorUID = auth.uid;
        
        // this.isLoading = false;
      } else {
        // this.isLoggedIn = false;
      }
    });
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/imgs/placeholder-image.png';
      this.selectedImage = null;
    }
  }



  onSubmit(formValue) {
    this.isSubmitted = true;
    this.showLoading = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.email}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['image'] = url;

          
            this.blogService.publishBlogPost(formValue);
            this.resetForm();
            this.router.navigate(['/']);
            
          })
        })
      ).subscribe();
    }
    this.showDone = true;
  }



  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({

      id: '',
      author: this.authorUID,  
      title: '',
      category: '',
      subject: '', 
      post: '',
      date: firebase.firestore.FieldValue.serverTimestamp(),
      comments: [],
      image: ''

      
    });
  }




}