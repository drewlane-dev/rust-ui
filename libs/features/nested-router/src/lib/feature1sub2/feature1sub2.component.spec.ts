import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feature1sub2Component } from './feature1sub2.component';

describe('Feature1sub2Component', () => {
  let component: Feature1sub2Component;
  let fixture: ComponentFixture<Feature1sub2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Feature1sub2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Feature1sub2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
