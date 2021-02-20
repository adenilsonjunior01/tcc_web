import { Injectable } from '@angular/core';

const TREE_DATA: IMenuNavigation[] = [
  {
    name: 'Cadastro',
    children: [
      {
        name: 'Funcionário',
        route: '/cadastro/funcionario'
      },
      {
        name: 'Médico',
        route: '/cadastro/medico'
      }
    ],
  }
];

export interface IFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

export interface IMenuNavigation {
  name: string;
  children?: IMenuNavigation[];
  route?: string;
}

@Injectable()
export class NavigationItem {
  get() {
    return TREE_DATA;
  }
}
