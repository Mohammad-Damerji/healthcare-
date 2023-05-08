import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromHdComponent } from './form-hd.component';

describe('FormComponent', () => {
  let component: FromHdComponent;
  let fixture: ComponentFixture<FromHdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromHdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromHdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
