import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUser2Component } from './add-user2.component';

describe('AddUser2Component', () => {
  let component: AddUser2Component;
  let fixture: ComponentFixture<AddUser2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUser2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUser2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
