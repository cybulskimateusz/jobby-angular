import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOccupationComponent } from './select-occupation.component';

describe('SelectOccupationComponent', () => {
  let component: SelectOccupationComponent;
  let fixture: ComponentFixture<SelectOccupationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectOccupationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOccupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
