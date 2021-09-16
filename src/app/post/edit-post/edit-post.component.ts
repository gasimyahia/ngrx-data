import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  postForm:FormGroup;
  id:string;

  constructor(private postService:PostService ,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.initPostForm();
    this.id=this.route.snapshot.params['id'];
    this.postService.entities$.subscribe((posts)=>{
      if(posts.length){
        const post=posts.find((post)=> post.id=== this.id);
        this.postForm.patchValue({
          title:post.title,
          description:post.description
        });
      }
    });
  }

  onUpdatePost(){
    if(this.postForm.invalid){
      return;
    }

    const postData={
      ...this.postForm.value,
      id:this.id,
    };

    this.postService.update(postData);
    this.router.navigateByUrl('/posts');
  }

  initPostForm(){
    this.postForm=new FormGroup({
      title:new FormControl(null,[Validators.required,Validators.minLength(6)]),
      description:new FormControl(null,[Validators.required,Validators.minLength(10)]),
    });
  }
}
