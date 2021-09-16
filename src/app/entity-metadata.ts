import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";

const entityMetadata:EntityMetadataMap={
  Post:{
    // update store first and then call api
    entityDispatcherOptions:{
      optimisticUpdate:true,
      optimisticDelete:true
    }
  },
}

export const entityConfig: EntityDataModuleConfig={
  entityMetadata,
}
