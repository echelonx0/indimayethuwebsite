import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/models/blog-posts';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: BlogPost[];

  constructor(private dataService: BlogService) { }

  ngOnInit(): void {


    this.dataService.getAllBlogPosts().subscribe(publications => {
      this.blogs = publications;
    });

  }

}