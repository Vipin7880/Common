import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherDurationFormComponent } from './higher-duration-form.component';

describe('HigherDurationFormComponent', () => {
  let component: HigherDurationFormComponent;
  let fixture: ComponentFixture<HigherDurationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HigherDurationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HigherDurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
