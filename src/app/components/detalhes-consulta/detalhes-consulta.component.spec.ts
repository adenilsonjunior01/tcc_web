import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesConsultaComponent } from './detalhes-consulta.component';

describe('DetalhesConsultaComponent', () => {
    let component: DetalhesConsultaComponent;
    let fixture: ComponentFixture<DetalhesConsultaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetalhesConsultaComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetalhesConsultaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
