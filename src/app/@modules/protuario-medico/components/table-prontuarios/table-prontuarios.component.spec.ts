import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProntuariosComponent } from './table-prontuarios.component';

describe('TableProntuariosComponent', () => {
    let component: TableProntuariosComponent;
    let fixture: ComponentFixture<TableProntuariosComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableProntuariosComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableProntuariosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
