import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './Layout/footer/footer.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FeatureHeaderComponent } from './components/feature-header/feature-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { RaisedBtnComponent } from './components/raised-btn/raised-btn.component';
import { FeatureActionsComponent } from './components/feature-actions/feature-actions.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { FeatureNavBtnComponent } from './components/feature-nav-btn/feature-nav-btn.component';
import { LegendComponent } from './components/legend/legend.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    FooterComponent,
    FeatureHeaderComponent,
    ConfirmDialogComponent,
    CalendarComponent,
    SubmitButtonComponent,
    PrimaryButtonComponent,
    FormDialogComponent,
    RaisedBtnComponent,
    FeatureActionsComponent,
    ErrorMsgComponent,
    FeatureNavBtnComponent,
    LegendComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    SpinnerComponent,
    FeatureHeaderComponent,
    FooterComponent,
    MatTooltipModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    ConfirmDialogComponent,
    MatExpansionModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    CalendarComponent,
    SubmitButtonComponent,
    PrimaryButtonComponent,
    FormDialogComponent,
    RaisedBtnComponent,
    FeatureActionsComponent,
    ErrorMsgComponent,
    FeatureNavBtnComponent,
    LegendComponent,
    SectionHeaderComponent
  ]
})
export class UiModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
}
