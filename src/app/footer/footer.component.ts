import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() msgFromParent:string="Initial value"
}

@Component({
  selector: 'app-second-footer',
  template: '<div>Hello second component</div>',
  styleUrl: './footer.component.scss'
})
export class SecondComponent{
  constructor(){
    console.log("I am the second component")
  }
}