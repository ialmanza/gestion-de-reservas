import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';  


export interface MissingFieldsData {
  title: string;
  message: string;
}


@Component({
  selector: 'app-missing-fields-modal',
  standalone: true,
  imports: [],
  templateUrl: './missing-fields-modal.component.html',
  styleUrl: './missing-fields-modal.component.css'
})
export class MissingFieldsModalComponent {

  constructor(
    public dialogRef: MatDialogRef<MissingFieldsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MissingFieldsData
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
