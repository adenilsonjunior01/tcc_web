import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import { CredentialsService } from '@app/auth';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { IMenuNavigation, IFlatNode, NavigationItem } from '../config/menu-navigation';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  constructor(
    private readonly titleService: Title,
    private readonly credentialsService: CredentialsService,
    private readonly media: MediaObserver,
    private readonly _nav: NavigationItem
  ) {
    this.dataSource.data = this._nav.get();
  }

  subtitle: string;

  ngOnInit() {
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  private _transformer = (node: IMenuNavigation, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      route: node.route,
      level: level,
    }
  }

  treeControl = new FlatTreeControl<IFlatNode>(
    node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: IFlatNode) => node.expandable;
}



