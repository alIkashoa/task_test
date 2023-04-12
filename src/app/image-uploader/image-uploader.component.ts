import { Component, OnInit, ViewEncapsulation,ElementRef, Renderer2, inject, NgModule  } from '@angular/core';
import { Firestore, collectionData, collection, Query, doc, setDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { HostListener } from "@angular/core";



@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class ImageUploaderComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
onResize() {
   this.screenHeight = window.innerHeight;
   this.screenWidth = window.innerWidth;
}

  private storage: Storage = inject(Storage);
  cords: string[] = [];
  screenHeight = window.innerHeight;
  screenWidth = window.innerWidth;
  file!: File;
  item$: Observable<Image[]> | undefined;
  firestore: Firestore = inject(Firestore);
  imageUrl: string | ArrayBuffer | null | undefined;
  clickedPosition: { x: number, y: number } | null = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
 
   }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.file = file;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.removeCircles();
      }
    }


  }

  onImageClick(event: MouseEvent) {
  
    const image = event.target as HTMLImageElement;
    const rect = image.getBoundingClientRect();
    const x = event.clientX - (rect?.left ?? 0);
    const y = event.clientY - (rect?.top ?? 0);
    this.clickedPosition = { x, y };


    console.log(this.screenWidth);
    
    const circle = document.createElement('div');
    circle.classList.add('circle');
    if(this.screenWidth >= 960)
    circle.style.left = `${event.clientX-200}px`;
    else
    circle.style.left = `${event.clientX}px`;

    circle.style.top = `${event.clientY}px`;
    image.parentElement?.appendChild(circle);
    this.cords.push(`${x},${y}`)
    
  }
  removeCircles() {
    const circles = this.elementRef.nativeElement.querySelectorAll('.circle');
    circles.forEach((circle: { parentNode: any; }) => {
      this.renderer.removeChild(circle.parentNode, circle);
    });
    this.cords=[]
  }

  async saveImage() {

    const imageCollection = collection(this.firestore, 'Images');
    const imageRef = await addDoc(imageCollection, {cords: this.cords});
    console.log(imageCollection);
    
    const storageRef = ref(this.storage, imageRef.id);
    uploadBytesResumable(storageRef, this.file );

    this.removeCircles()
    this.imageUrl = undefined ;
    this.clickedPosition = null;
  }

}

interface Image {
  cords: string[];
}