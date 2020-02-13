import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DupaComponent } from './dupa.component';

describe('DupaComponent', () => {
  let component: DupaComponent;
  let fixture: ComponentFixture<DupaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DupaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
