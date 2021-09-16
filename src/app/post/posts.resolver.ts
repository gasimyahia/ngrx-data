import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { first, tap } from "rxjs/operators";
import { PostService } from "./posts.service";

@Injectable()
export class PostsResolver implements Resolve<boolean>{
  constructor(private PostService:PostService){}

  resolve(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ):boolean | Observable<boolean> | Promise<boolean>{
    return this.PostService.loaded$.pipe(
      tap((loaded)=>{
        if(!loaded){
          this.PostService.getAll();
        }
      }),
      first()
    );
  }
}
