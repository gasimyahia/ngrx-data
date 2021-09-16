import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm:FormGroup;

  constructor(private postService:PostService ,private router:Router) { }

  ngOnInit(): void {
    this.initPostForm();
  }

  onAddPost(){
    if(this.postForm.invalid){
      return;
    }

    const post:Post=this.postForm.value;
    this.postService.add(post).subscribe((data)=>{
      this.router.navigateByUrl('/posts');
    });
  }

  initPostForm(){
    this.postForm=new FormGroup({
      title:new FormControl(null,[Validators.required,Validators.minLength(6)]),
      description:new FormControl(null,[Validators.required,Validators.minLength(10)]),
    });
  }

}
