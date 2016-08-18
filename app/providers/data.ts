import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import { PhotoModel } from '../models/photo';

@Injectable()
export class DataService {

  storage: Storage;

  constructor() {
    this.storage = new Storage(SqlStorage, {name:'photos'});
  }

  getPhotos(): Promise<any>{
    return this.storage.get('photos')
    .then(data => {
      if (data !== undefined){
        return Promise.resolve(JSON.parse(data).map(photo => {
          return new PhotoModel(photo.image, new Date(photo.date))
        }));
      }
      return Promise.reject('No existe');
    })
    .catch(error => Promise.reject(error))
  }

  savePhotos(data): void {
    this.storage.set('photos', JSON.stringify(data));
  }

}

