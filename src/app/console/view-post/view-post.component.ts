import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPost } from 'src/app/models/blog-posts';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  
})
export class ViewPostComponent implements OnInit {

  id: string;
  publication: BlogPost;
  similarPosts: BlogPost[];
  comments: any[];


  constructor(
    private dataService: BlogService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    // Get publication
    this.dataService.getBlogPost(this.id).subscribe(pub => {
      if(pub != null) {
        this.publication = pub;
        
      }
      
      this.publication = pub;
    });
}

  }

