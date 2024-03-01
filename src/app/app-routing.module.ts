import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([{
      path: '', component: AppLayoutComponent,

      children: [
        { path: 'uikit', loadChildren: () => import('./uikit/uikit.module').then(m => m.UIkitModule) },
        { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) }

    ]},
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

       
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
],
exports: [RouterModule]
})
export class AppRoutingModule { }
