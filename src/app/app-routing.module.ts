import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    // loadChildren: () =>
    //   import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  // {
  //   path: 'edit',
  //   loadChildren: () =>
  //     import('./pages/edit/edit.module').then((m) => m.EditPageModule),
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'tab4',
    loadChildren: () =>
      import('./tab4/tab4.module').then((m) => m.Tab4PageModule),
  },
  {
    path: 'custom',
    loadChildren: () =>
      import('./flowers/custom/custom.module').then((m) => m.CustomPageModule),
  },
  {
    path: 'quick',
    loadChildren: () =>
      import('./flowers/quick/quick.module').then((m) => m.QuickPageModule),
  },
  {
    path: 'otp',
    loadChildren: () =>
      import('./popovers/otp/otp.module').then((m) => m.OTPPageModule),
  },
  {
    path: 'custom/generate',
    loadChildren: () =>
      import('./flowers/generate/generate.module').then(
        (m) => m.GeneratePageModule
      ),
  },
  {
    path: 'confirmation',
    loadChildren: () =>
      import('./confirmation/confirmation.module').then(
        (m) => m.ConfirmationPageModule
      ),
  },
  {
    path: 'toPay',
    loadChildren: () => import('./pages/to-pay/to-pay.module').then( m => m.ToPayPageModule)
  },  {
    path: 'completed',
    loadChildren: () => import('./pages/completed/completed.module').then( m => m.CompletedPageModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./pages/service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'confirmcart',
    loadChildren: () => import('./pages/confirmcart/confirmcart.module').then( m => m.ConfirmcartPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
