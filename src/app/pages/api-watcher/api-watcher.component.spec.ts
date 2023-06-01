import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiWatcherComponent } from './api-watcher.component';

describe('ApiWatcherComponent', () => {
  let component: ApiWatcherComponent;
  let fixture: ComponentFixture<ApiWatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiWatcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
