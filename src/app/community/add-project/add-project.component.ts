import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { CommunityService } from 'src/app/services/community.service';
import { ContentChange, EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from 'ngx-quill';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

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
    projectInitiator: new FormControl (''),
    // category: new FormControl(''),
    projectTitle: new FormControl (''),
    projectSummary: new FormControl(''),
    projectDetails: new FormControl(''),
    projectLocation: new FormControl(''),
    dateSubmitted: new FormControl (firebase.firestore.FieldValue.serverTimestamp()),
    comments: new FormArray([]),
    image: new FormControl(''),
    stillOpen: new FormControl(true),
    votesFor: new FormControl(0),
    votesAgainst: new FormControl(0),
    videoLink: new FormControl('')

    
  })

  constructor(private dataService: CommunityService, private authService: AuthService, private storage: AngularFireStorage,  private router: Router) { }

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
      this.imgSrc = 'assets/volunteers/main.jpg';
      this.selectedImage = null;
    }
  }



  launchProject(formValue){
    

    this.isSubmitted = true;
    this.showLoading = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.email}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['image'] = url;

          
            this.dataService.createNewCommunityProject(formValue);
            this.resetForm();
            this.router.navigate(['/admin/completed']);
            
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
      projectInitiator: '',
      projectTitle: '',
      projectSummary: '',
      projectDetails: '',
      projectLocation: '',
      dateSubmitted: firebase.firestore.FieldValue.serverTimestamp(),
      stillOpen: '',
      votesFor: 0,
      votesAgainst: 0,
      videoLink: '',
      comments: [],
      image: ''

      // id: new FormControl(new FormControl('')),
  
      // category: new FormControl(''),
      // projectTitle: new FormControl (''),
      // projectSummary: new FormControl(''),
      // projectDetails: new FormControl(''),
      // projectLocation: new FormControl(''),
      // dateSubmitted: new FormControl (firebase.firestore.FieldValue.serverTimestamp()),
      // comments: new FormArray([]),
      // image: new FormControl(''),
      // stillOpen: new FormControl(true),
      // votesFor: new FormControl(0),
      // votesAgainst: new FormControl(0),
      // videoLink: new FormControl('')

      
    });
  }



}
