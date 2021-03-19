import { Title } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import { CredentialsService } from '@app/auth';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { IMenuNavigation, IFlatNode, NavigationItem } from '../config/menu-navigation';
import { ClinicaService } from '../services/clinica/clinica.service';
import { untilDestroyed } from '../@core/until-destroyed';
import { IClinicaModel } from '../models/clinica-model';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, OnDestroy {
  constructor(
    private readonly titleService: Title,
    private readonly credentialsService: CredentialsService,
    private readonly media: MediaObserver,
    private readonly _nav: NavigationItem,
    private readonly _clinica: ClinicaService
  ) {
    this.dataSource.data = this._nav.get();
  }
  ngOnDestroy(): void {}

  subtitle: string;
  dadosClinica: IClinicaModel;
  errorRequest = false;

  ngOnInit() {
    this.getDadosClinica();
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.email : null;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  public getDadosClinica() {
    this._clinica
      .getDadosClinica()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (body: IClinicaModel) => (this.dadosClinica = body),
        error: () => (this.errorRequest = true),
      });
  }

  private _transformer = (node: IMenuNavigation, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      route: node.route,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<IFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: IFlatNode) => node.expandable;
}
