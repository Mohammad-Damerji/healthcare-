import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePredictionComponent } from  './image-prediction.component';

describe('ImagePredictionComponent', () => {
  let component: ImagePredictionComponent;
  let fixture: ComponentFixture<ImagePredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagePredictionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagePredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
