import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  id:string;
  post:Post;

  constructor(private postService:PostService ,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.postService.entities$.subscribe((posts)=>{
      this.post=posts.find((post)=> post.id=== this.id);
    });
  }

}
