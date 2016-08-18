import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Camera, SocialSharing } from 'ionic-native';
import { SimpleAlertService } from '../../providers/simple-alert';
import { DataService } from '../../providers/data';
import { DaysAgo } from '../../pipes/days-ago';
import { PhotoModel } from '../../models/photo';
import { SlideshowPage } from '../slideshow/slideshow';


@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [ DaysAgo ]
})
export class HomePage {

  photoTaken: boolean = false;
  photos: PhotoModel[] = [];

  constructor(
    private _navCtrl: NavController,
    private _dataService: DataService,
    private _simpleAlert: SimpleAlertService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _loadCtrl: LoadingController
  ) {
    this.loadPhotos();
  }

  loadPhotos(){
    let load = this._loadCtrl.create();
    load.present();
    this._dataService.getPhotos()
    .then(photos =>{
      this.photos = photos;
      this.validatePhotoTaken();
      load.dismiss();
    })
    .catch(error => {
      console.error( error );
      load.dismiss();
    })
  }

  validatePhotoTaken(){
    if(this.photos.length > 0){
      this.photoTaken = this.isEqualDate(new Date(), this.photos[0].date);
    }
  }

  isEqualDate(today: Date, photoDate: Date){
    return photoDate.setHours(photoDate.getHours(),photoDate.getMinutes(),0,0) == today.setHours(today.getHours(),today.getMinutes(),0,0);
  }

  takePhoto(){
    /*let imagePath = 'http://placehold.it/450x450';
    this.photoTaken = true;
    this.createPhoto( imagePath );
    this.sharePhoto( imagePath )
    */
    let options = {
      quality: 100,
      destinationType: 1, //return a path to the image on the device
      sourceType: 1, //use the camera to grab the image
      encodingType: 0, //return the image in jpeg format
      cameraDirection: 1, //front facing camera
      saveToPhotoAlbum: true //save a copy to the users photo album as well
    };
    Camera.getPicture( options ).then(imagePath => {
      let currentName = imagePath.replace(/^.*[\\\/]/, '');
      let newFileName = new Date().getTime() + '.jpg';
      this.photoTaken = true;
      console.log(currentName);
      this.createPhoto( imagePath );
      this.sharePhoto( imagePath )
    })
    .catch(error => {
      let alert = this._simpleAlert.createAlert('Oops!', 'Algo fallo!');
      alert.present();
    })

  }

  createPhoto(imagePath: string){
    this.photos.unshift( new PhotoModel(imagePath, new Date()) );
    this.save();
  }

  removePhoto( photo: PhotoModel, index: number ){
    
    if(index > -1){
      if(this.isEqualDate(new Date(), photo.date)) this.photoTaken = false;
      this.photos.splice(index, 1);
      this.save();
    }
  }

  playSlideshow(){
    if(this.photos.length > 1){
      let modal = this._modalCtrl.create( SlideshowPage, {
        photos: this.photos
      });
      modal.present();
    }else{
      let alert = this._simpleAlert.createAlert('Oops!', 'You need at leasttwo photos before you can play a slideshow.');
      alert.present();
    }
    
  }

  sharePhoto(imagePath: string){
    let alert = this._alertCtrl.create({
      title: 'Nice one!',
      message: 'You\'ve taken your photo for today, would you also like to share it?',
      buttons: [
        {
          text: 'No, Thanks'
        },
        {
          text: 'Share',
          handler: () => {
            SocialSharing.share('I\'m taking a selfie every day with #Snapaday', null, imagePath, null)
          }
        }
      ]
    });
  }

  save(){
    this._dataService.savePhotos(this.photos)
  }
}
