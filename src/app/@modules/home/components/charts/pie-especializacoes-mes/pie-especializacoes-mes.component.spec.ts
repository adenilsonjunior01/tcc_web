import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieEspecializacoesMesComponent } from './pie-especializacoes-mes.component';

describe('PieEspecializacoesMesComponent', () => {
    let component: PieEspecializacoesMesComponent;
    let fixture: ComponentFixture<PieEspecializacoesMesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PieEspecializacoesMesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PieEspecializacoesMesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
