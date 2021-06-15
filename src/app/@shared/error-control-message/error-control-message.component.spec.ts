import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorControlMessageComponent } from './error-control-message.component';

describe('ErrorControlMessageComponent', () => {
    let component: ErrorControlMessageComponent;
    let fixture: ComponentFixture<ErrorControlMessageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ErrorControlMessageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorControlMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
