import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/*
  Generated class for the SlideshowPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/slideshow/slideshow.html',
})
export class SlideshowPage {

  @ViewChild('imagePlayer') imagePlayer: ElementRef;
  imagePlayerInterval: any;
  photos: any[];

  constructor(
    private _viewCtrl: ViewController,
    private _params: NavParams
  ) {
    this.photos = this._params.get('photos');
  }

  ngAfterViewInit(){
    this.playPhotos();
  }

  closeModal(){
    this.clear();
    this._viewCtrl.dismiss();
  }

  playPhotos(){
    let imagePlayer = this.imagePlayer.nativeElement;
    imagePlayer.src = this.photos[0].image;
    let i = 1;
    this.clear();
    this.imagePlayerInterval = setInterval(()=>{
      if(i < this.photos.length){
        imagePlayer.src = this.photos[i].image;
        i++;
      }else{
        this.clear();
      }
    }, 500);
  }

  clear(){
    clearInterval( this.imagePlayerInterval );
  }

}
