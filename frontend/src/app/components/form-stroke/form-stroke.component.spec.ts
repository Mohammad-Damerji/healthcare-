import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStrokeComponent } from './form-stroke.component';

describe('FormComponent', () => {
  let component: FormStrokeComponent;
  let fixture: ComponentFixture<FormStrokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStrokeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStrokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
