import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprenderComponent } from './aprender.component';

describe('AprenderComponent', () => {
  let component: AprenderComponent;
  let fixture: ComponentFixture<AprenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprenderComponent]
    });
    fixture = TestBed.createComponent(AprenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
