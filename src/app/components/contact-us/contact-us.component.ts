import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
    contactForm: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.contactForm = this.fb.group({
        name: [
          '',
          [
            Validators.required,
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        message: [
          '',
          [
            Validators.required,
            Validators.maxLength(500),
          ],
        ],
      });
    }
  
    submitForm() {
      if (this.contactForm.valid) {
        console.log('Form submitted with data:', this.contactForm.value);
      } else {
        this.markFormGroupTouched(this.contactForm);
      }
    }
  
    markFormGroupTouched(formGroup: FormGroup) {
      Object.values(formGroup.controls).forEach((control) => {
        control.markAsTouched();
  
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      });
    }
  }
  