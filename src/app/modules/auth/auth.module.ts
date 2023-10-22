import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterLoginModalComponent } from './modal/register-login-modal/register-login-modal.component';
import { FormGenericoComponent } from 'src/app/core/components/form-generico/form-generico.component';
import { BotonGenericoComponent } from 'src/app/core/components/boton-generico/boton-generico.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CollapseComponent } from 'src/app/core/components/collapse/collapse.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AuthContainerComponent,
    LoginComponent,
    RegisterComponent,
    RegisterLoginModalComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormGenericoComponent,
    BotonGenericoComponent,
    MatDialogModule,
    MatStepperModule,
    MatButtonModule,
    CollapseComponent,
    MatDividerModule,
  ],
})
export class AuthModule {}
