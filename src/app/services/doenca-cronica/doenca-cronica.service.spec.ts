import { TestBed } from '@angular/core/testing';

import { DoencaCronicaService } from './doenca-cronica.service';

describe('DoencaCronicaService', () => {
    let service: DoencaCronicaService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DoencaCronicaService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
