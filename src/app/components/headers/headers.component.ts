import { SignupComponent } from './../../pages/components/signup/signup.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss'],
})
export class HeadersComponent implements OnInit {
  constructor(public signinDialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.signinDialog.open(SignupComponent);
    dialogRef.afterClosed().subscribe((result) => console.log('dialog closed |' + result.toString()));
  }
}
