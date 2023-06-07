import { TestBed } from '@angular/core/testing';

import { AnaliticasService } from './analiticas.service';

describe('AnaliticasService', () => {
  let service: AnaliticasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnaliticasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
