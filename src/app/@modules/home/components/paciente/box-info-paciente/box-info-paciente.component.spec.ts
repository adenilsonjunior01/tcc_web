import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxInfoPacienteComponent } from './box-info-paciente.component';

describe('BoxInfoPacienteComponent', () => {
    let component: BoxInfoPacienteComponent;
    let fixture: ComponentFixture<BoxInfoPacienteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BoxInfoPacienteComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BoxInfoPacienteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
