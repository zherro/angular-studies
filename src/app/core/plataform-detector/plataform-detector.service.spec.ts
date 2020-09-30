import { TestBed } from '@angular/core/testing';

import { PlataformDetectorService } from './plataform-detector.service';

describe('PlataformDetectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlataformDetectorService = TestBed.get(PlataformDetectorService);
    expect(service).toBeTruthy();
  });
});
