import { Injectable } from '@angular/core';

const TREE_DATA: IMenuNavigation[] = [
  {
    name: 'Cadastro',
    children: [
      {
        name: 'Médico',
        route: '/pacientes'
      },
      {
        name: 'Funcionário',
        route: '/pacientes'
      }
    ],
  },
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
