import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoConsultaComponent } from './agendamento-consulta.component';

describe('AgendamentoConsultaComponent', () => {
    let component: AgendamentoConsultaComponent;
    let fixture: ComponentFixture<AgendamentoConsultaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgendamentoConsultaComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AgendamentoConsultaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
