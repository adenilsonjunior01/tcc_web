import { Component, Input, OnInit } from '@angular/core';
import { IQuantitativoUsuariosModel } from '@app/models/dados-estastisticos-administrador';

@Component({
    selector: 'app-quantitativo-usuarios',
    templateUrl: './quantitativo-usuarios.component.html',
    styleUrls: ['./quantitativo-usuarios.component.scss'],
})
export class QuantitativoUsuariosComponent implements OnInit {
    @Input() quantitativoUsuarios: IQuantitativoUsuariosModel[];

    constructor() {}

    ngOnInit(): void {}

    public filterQuantitativo(role: any): any {
        return this.quantitativoUsuarios?.filter((v: any) => v.descricao === role)[0].quantidade;
    }
}
