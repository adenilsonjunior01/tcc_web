import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

//  router-outlet principal,
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule)
    }
  ]),
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
