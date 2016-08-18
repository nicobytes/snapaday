import { Injectable } from '@angular/core';

@Injectable()
export class PhotoModel {

  constructor(
    public image: string,
    public date: Date    
  ) {
  }

}

