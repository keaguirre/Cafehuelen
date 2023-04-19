import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngrePrepComponent } from './ingre-prep.component';

describe('IngrePrepComponent', () => {
  let component: IngrePrepComponent;
  let fixture: ComponentFixture<IngrePrepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngrePrepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngrePrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
