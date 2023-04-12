import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { RouterModule } from '@angular/router';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageUploaderComponent,
    NavMenuComponent,
    
  ],
  imports: [
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    NoopAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    MatSlideToggleModule,
    RouterModule.forRoot([
      {path: 'view', component: ImageViewerComponent},
      {path: 'upload', component: ImageUploaderComponent},
    ]),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({ 
      apiKey: "AIzaSyCLP8Yvbg6stBJtZM6ApFHFBYIn-toLR3Q",
      authDomain: "tasktest-92962.firebaseapp.com",
      projectId: "tasktest-92962",
      storageBucket: "tasktest-92962.appspot.com",
      messagingSenderId: "922607896221",
      appId: "1:922607896221:web:15e64cff662b9456f43674",
      measurementId: "G-899M62PYBR"
    })),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
