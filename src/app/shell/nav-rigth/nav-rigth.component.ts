import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '../../auth/credentials.service';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-nav-rigth',
  templateUrl: './nav-rigth.component.html',
  styleUrls: ['./nav-rigth.component.scss'],
})
export class NavRigthComponent implements OnInit {
  subtitle: string;

  constructor(
    private readonly _titleService: Title,
    private readonly _activetedRouter: ActivatedRoute,
    private readonly _credentialsService: CredentialsService,
    private readonly _authenticationService: AuthenticationService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.getSubtitle();
  }

  get title(): string {
    return this._titleService.getTitle();
  }

  get username(): string | null {
    const credentials = this._credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  public getSubtitle() {
    this.subtitle = this._activetedRouter.snapshot.children[0].data.subtitle;
    console.log(this._activetedRouter.snapshot.children[0].data);
  }

  public logout() {
    this._authenticationService.logout().subscribe(() => this._router.navigate(['/login'], { replaceUrl: true }));
  }
}
