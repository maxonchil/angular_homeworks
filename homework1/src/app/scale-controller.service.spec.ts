import { TestBed } from '@angular/core/testing';

import { ScaleControllerService } from './scale-controller.service';

describe('ScaleControllerService', () => {
  let service: ScaleControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScaleControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
