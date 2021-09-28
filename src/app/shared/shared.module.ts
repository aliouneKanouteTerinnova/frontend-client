import { InterceptorInterceptor } from './../interceptor/interceptor.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
<<<<<<< HEAD
=======
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
>>>>>>> 6daacc496cabc2fc0cb09da4e0a82fa5b7a9c40b

import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
<<<<<<< HEAD
import { MatSelectModule } from '@angular/material/select';
=======
>>>>>>> 6daacc496cabc2fc0cb09da4e0a82fa5b7a9c40b
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    MatCarouselModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
<<<<<<< HEAD
=======
    MatExpansionModule,
    MatRadioModule,
    MatSelectModule,
>>>>>>> 6daacc496cabc2fc0cb09da4e0a82fa5b7a9c40b
    MatSidenavModule,
    MatRippleModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
