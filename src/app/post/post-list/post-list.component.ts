import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts$:Observable<Post[]>;

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.posts$= this.postService.entities$;
  }

  onDeletePost(event:Event,id:string){
    event.preventDefault();
    if(confirm('Are you sure you want to delete this posts')){
      this.postService.delete(id);
    }
  }

}
