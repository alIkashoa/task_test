import { Component, OnInit, ViewEncapsulation,ElementRef, Renderer2, inject, NgModule  } from '@angular/core';
import { Firestore, collectionData, collection, Query, doc, setDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {
  str : String = "";
  firestore: Firestore = inject(Firestore);
  item$: Observable<any[]>;
  constructor() {

    const itemCollection = collection(this.firestore, 'Images');
    this.item$ = collectionData(itemCollection);

    this.item$.subscribe(items => this.add(items));

    }
  add(items : any){

     for(let item in items){
       this.str += `
       
       |                    |
       `
       ;
       for(let i in items[item].cords){

          this.str += "("+items[item].cords[i]+")";

       }
     }

  }
}

