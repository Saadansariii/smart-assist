import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Events } from '../../model/class/event';

@Component({
  selector: 'app-single-event',
  standalone: true,
  imports: [CommonModule , FormsModule , ],
  templateUrl: './single-event.component.html',
  styleUrl: './single-event.component.css'
})
export class SingleEventComponent implements OnInit{

  EventList = signal<Events[]>([]);

  ngOnInit(){
    this.getEventById
  }

  getEventById(){
    
  }
}
