import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { FotoService } from '../foto.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  urlImageStorage : string[] = [];

  constructor(afs: AngularFirestore, public fotoService: FotoService, private afStorage: AngularFireStorage) {
    this.isiDataColl = afs.collection('dataNotes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  path:String=""

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  Judul : string;
  Isi: string;
  Tanggal: string;
  Nilai: string;

  upload(){
    this.isiDataColl.doc(this.Judul). set({
      judul : this.Judul,
      isi : this.Isi,
      tanggal : this.Tanggal,
      nilai : this.Nilai
      })
    }

    uploadFoto(){
      for (var index in this.fotoService.dataFoto){
        const imgFilePath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`
    
        this.afStorage.upload(imgFilePath, this.fotoService.dataFoto[index].dataImage).then(() => {
          this.afStorage.storage.ref().child(imgFilePath).getDownloadURL().then((url) => {
            this.urlImageStorage.unshift(url)
            console.log(url);
          });
        });
      }
    }
    TambahFoto(){
      this.fotoService.tambahFoto();
    }
}

interface data{
  judul : string,
  isi : string,
  tanggal: string,
  nilai: string
}