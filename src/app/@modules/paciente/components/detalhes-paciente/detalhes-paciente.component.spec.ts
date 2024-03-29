import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPacienteComponent } from './detalhes-paciente.component';

describe('DetalhesPacienteComponent', () => {
    let component: DetalhesPacienteComponent;
    let fixture: ComponentFixture<DetalhesPacienteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetalhesPacienteComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetalhesPacienteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
