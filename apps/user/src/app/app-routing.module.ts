import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserAuthGuard } from './guards/user-auth.guard';
import { CartResolverService } from './resolvers/cart-resolver.service';
import { CategoryResolverService } from './resolvers/category-resolver.service';
import { ProductResolverService } from './resolvers/product-resolver.service';
import { ProfileResolverService } from './resolvers/profile-resolver.service';
import { ApplicationErrorComponent } from '../../../../libs/components/application-error/application-error.component';
import { PageNotFoundComponent } from '../../../../libs/components/page-not-found/page-not-found.component';
import { ResourceNotFoundComponent } from '../../../../libs/components/resource-not-found/resource-not-found.component';


// steps to implement lazy loading:
// 1. create child module and child routing module
// 2. specify the main route in theis module on app.routing.module
// 3. register the child routing module in child module .
// 4. oreloade module option must be configure by:
//     {preloadingStaregy: PreloadAllModules}
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  
  },

  {
    path: 'auth',
   loadChildren: () => import('./components/auth/auth.module').then((m)=> m.AuthModule)
  
  },
  {
    path: 'profile',
    component: ProfileComponent,
      // resolve: {
      //   profile: ProfileResolverService
      // },
    // canActivate: [UserAuthGuard]
  },
  {
    path: 'orders',
    component: OrderComponent,
    canActivate: [UserAuthGuard]

  },
  {
    path: 'cart',
    component: CartComponent,
    resolve: {
      userCart: CartResolverService
    },
    canActivate: [UserAuthGuard],
  },
  // {
  //   path: 'auth',
  //   children: [
  //     {
  //       path: 'login',
  //       component: LoginComponent
  //     },
  //     {
  //       path: 'register',
  //       component: RegisterComponent
  //     }
  //   ]
  // },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'products',
    component: ProductListComponent,
    resolve: {
      products: ProductResolverService
    }
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    resolve: {
      categories: CategoryResolverService // only if the route is: localhost:4200/categories
    }
  },
  {
    path: 'categories/:id',
    component: CategoryDetailsComponent
  },
  {path: "notFoundResource/:status", component: ResourceNotFoundComponent},
  {path: "applicationError/:status", component: ApplicationErrorComponent},
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
