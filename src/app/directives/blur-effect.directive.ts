import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBlurEffect]'
})
export class BlurEffectDirective implements OnChanges{

  @Input('appBlurEffect') blurValue: number=0;

  constructor(private el:ElementRef, private renderer: Renderer2 ) { 
    
  }

  ngOnChanges() {
    if (this.blurValue) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'filter',
        `blur(${this.blurValue}px)`
      );
      this.el.nativeElement.style.cursor = "not-allowed";
    }
  }

//  ngOnInit(): void {
//   this.e1.nativeElement.style.opacity = this.opacityValue;
//   if(this.opacityValue==0.5){
//     this.e1.nativeElement.style.backgroundColor = "#000000";
//     this.e1.nativeElement.style.cursor = "not-allowed";
//   }
//  }


}
