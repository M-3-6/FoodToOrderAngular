import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBlurEffect]'
})
export class BlurEffectDirective implements OnInit{

  @Input('appBlurEffect') opacityValue:number=1;

  constructor(private e1:ElementRef ) { 
    
  }

 ngOnInit(): void {
  this.e1.nativeElement.style.opacity = this.opacityValue;
  if(this.opacityValue==0.5){
    this.e1.nativeElement.style.backgroundColor = "#000000";
    this.e1.nativeElement.style.cursor = "not-allowed";
  }
 }


}
