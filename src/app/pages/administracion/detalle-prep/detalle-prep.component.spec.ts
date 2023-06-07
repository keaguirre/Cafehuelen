import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePrepComponent } from './detalle-prep.component';

describe('DetallePrepComponent', () => {
  let component: DetallePrepComponent;
  let fixture: ComponentFixture<DetallePrepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePrepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
