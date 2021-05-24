import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-journal-diary',
  templateUrl: './journal-diary.component.html',
  styleUrls: ['./journal-diary.component.css']
})
export class JournalDiaryComponent implements OnInit {

  userID: string;
  diary: any[];

  constructor(private auth: AuthService, private journalService: TransactionsService) { }

  ngOnInit(): void {
    

    this.auth.getAuth().subscribe(auth => {
      if(auth) {
      
        this.userID = auth.uid;
        this.getMyJournals();
      
      } else {
         //
      }
    })

    
  }

  getMyJournals(){

    this.journalService.getTransactions(this.userID).subscribe(data => {
      this.diary = data;
      console.log(this.diary.length);
    })

  }

}
