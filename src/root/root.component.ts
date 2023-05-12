import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  standalone: true
})
export class RootComponent implements OnInit {
  title: string = 'Gestore di Biblioteca';

  constructor() { }

  ngOnInit() {
  }

}