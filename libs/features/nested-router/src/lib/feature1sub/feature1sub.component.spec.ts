import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feature1subComponent } from './feature1sub.component';

describe('Feature1subComponent', () => {
  let component: Feature1subComponent;
  let fixture: ComponentFixture<Feature1subComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Feature1subComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Feature1subComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
