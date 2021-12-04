
//modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FilesModule } from '../../../../libs/module/files/files.module';
import { NgxModule } from '../../../../libs/module/ngx/ngx.module';

//services
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';

//pips
import { ProductFilterPipe } from './pipes/product-filter.pipe';

//components
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ContentComponent } from './components/content/content.component';
import { OrderComponent } from './components/order/order.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AddToCartComponent } from './shared/add-to-cart/add-to-cart.component';
import { AlertComponent} from '../../../../libs/components/alert/alert.component'
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule} from'../../../../libs/module/material/material.module'
import { ApplicationErrorComponent } from '../../../../libs/components/application-error/application-error.component';
import { PageNotFoundComponent } from '../../../../libs/components/page-not-found/page-not-found.component';
import { ResourceNotFoundComponent } from '../../../../libs/components/resource-not-found/resource-not-found.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    SidenavComponent, 
    HomeComponent,
    CartComponent,
    CategoryDetailsComponent,
    CategoryListComponent,
    ContentComponent,
    HomeComponent,
    OrderComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProfileComponent,
    ProductFilterPipe,
    AddToCartComponent,
    AlertComponent,
    ApplicationErrorComponent,
    PageNotFoundComponent,
    ResourceNotFoundComponent,
    ContactComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxModule, // you can get its modules here insted of outside files 
    FormsModule,
    ReactiveFormsModule,
    FilesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true // يعني خلي يفوت علي كل ريكويست طالع 

    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true // يعني خلي يفوت علي كل ريكويست طالع 

    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

