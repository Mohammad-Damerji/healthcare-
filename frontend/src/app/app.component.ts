import { Component, ViewChild } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;
  title = 'frontend';
}

