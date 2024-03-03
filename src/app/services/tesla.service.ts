import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Model } from '../types/model';
import { Option } from '../types/option';

@Injectable({
  providedIn: 'root'
})
export class TeslaService {
  http: HttpClient = inject(HttpClient);
  models: Model[] = [];
  mapOptions: Map<string, Option> = new Map();

  constructor() {
   }

   getModels():Observable<Model[]>{     
       if(this.models.length > 0){
        return of(this.models);
       }else{
        return this.http.get("/models").pipe(map(models=> models as Model[]),tap(models => this.models = models));
       }
   }
   getOptions(model:string):Observable<Option>{
    const options = this.mapOptions.get(model);
    if(options){
      return of(options);
    }else{
      return this.http.get<Option>(`/options/${model}`).pipe(tap(options=>this.mapOptions.set(model,options)));
    }
   }
}
