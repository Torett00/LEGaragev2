import { Component, OnInit } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'LEGARAGEEE';

  constructor (private firestore: Firestore){
    
  }

  public ngOnInit(): void {
      const testCollection=collection(this.firestore,'test');
      addDoc(testCollection,{text:"i hate firebase"});
  }
}
