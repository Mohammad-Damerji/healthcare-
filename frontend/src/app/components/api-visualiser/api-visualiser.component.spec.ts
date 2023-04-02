import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiVisualiserComponent } from './api-visualiser.component';

describe('ApiVisualiserComponent', () => {
  let component: ApiVisualiserComponent;
  let fixture: ComponentFixture<ApiVisualiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiVisualiserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiVisualiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
