import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Update } from "@ngrx/entity";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Post } from "../models/post.model";

@Injectable()
export class PostsDataService extends DefaultDataService<Post>{
  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator){
    super('Post',http,httpUrlGenerator)
  }

  getAll():Observable<Post[]>{
    return this.http.get(environment.ApiUrl).pipe(
      map((data)=>{
        const posts:Post[]=[];
        for(let key in data){
          posts.push({...data[key],id:key});
        }
        return posts;
      })
    );
  }

  add(post:Post):Observable<Post>{
    return this.http.post<{name:string}>(environment.ApiUrl,post).pipe(
      map((data)=>{
        return {...post,id:data.name}
      })
    );
  }

  update(post:Update<Post>):Observable<Post>{
    return this.http.put<Post>(`https://state-management-46abf-default-rtdb.firebaseio.com/posts/${post.id}.json`,{...post.changes});
  }

  delete(id:string): Observable<string> {
    return this.http.delete(`https://state-management-46abf-default-rtdb.firebaseio.com/posts/${id}.json`).pipe(
      map((data)=>{
        return id;
      })
    );
  }
}
