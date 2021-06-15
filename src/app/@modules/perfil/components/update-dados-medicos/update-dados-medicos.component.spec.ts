import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDadosMedicosComponent } from './update-dados-medicos.component';

describe('UpdateDadosMedicosComponent', () => {
    let component: UpdateDadosMedicosComponent;
    let fixture: ComponentFixture<UpdateDadosMedicosComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UpdateDadosMedicosComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateDadosMedicosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
