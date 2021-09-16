import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { Post } from "../models/post.model";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostsDataService } from "./posts.data.service";
import { PostsResolver } from "./posts.resolver";
import { SinglePostComponent } from "./single-post/single-post.component";


export const routes: Routes = [
  {path:'',component:PostListComponent,
   // to control to colling of api
   resolve:{posts:PostsResolver}
  },
  {path:'posts/add',component:AddPostComponent},
  {path:'posts/edit/:id',component:EditPostComponent,
   // to control to colling of api
   resolve:{posts:PostsResolver}},
  {path:'posts/details/:id',component:SinglePostComponent,
      // to control to colling of api
      resolve:{posts:PostsResolver}
  },
];

const entityMetadata:EntityMetadataMap={
  Post:{
    // for sort data
    sortComparer:sortByTitle,
    // update store first and then call api
    entityDispatcherOptions:{
      optimisticUpdate:true,
      optimisticDelete:true
    }
  },
}

function sortByTitle(a:Post,b:Post):number{
  let compare=a.title.localeCompare(b.title);
  // this for desc sort
  // if(compare>0)
  // return -1;
  // if(compare<0)
  // return 1;

  return compare;
}


@NgModule({
  declarations:[
    PostListComponent,
    AddPostComponent,
    EditPostComponent,
    SinglePostComponent,
  ],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers:[PostsDataService,PostsResolver]

})
export class PostModule{
  constructor(
    eds:EntityDefinitionService,
    entityDataService:EntityDataService,
    PostsDataService:PostsDataService
    ){
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Post',PostsDataService);
  }
}
