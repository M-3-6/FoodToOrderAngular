import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit, OnDestroy, OnChanges{
  constructor(){
    console.log("constructor called")
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Onchanges called")
  }
  ngOnDestroy(): void {
    console.log("Destroy called")
  }
  ngOnInit(): void {
    console.log("Component initialized")
  }
}
