import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-view-journal-diary',
  templateUrl: './view-journal-diary.component.html',
  styleUrls: ['./view-journal-diary.component.css']
})
export class ViewJournalDiaryComponent implements OnInit {
  id: string;
  entry: any;

  constructor(private dataService: TransactionsService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']

    this.dataService.getJournalEntry(this.id).subscribe(data => {
      this.entry = data;
      console.log(this.entry);
   
    })

  }

}
