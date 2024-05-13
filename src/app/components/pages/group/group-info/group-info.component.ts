import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserGroupModel } from 'src/app/components/model/GroupsModel';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent {
  
  constructor(
    public dialogRef: MatDialogRef<GroupInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public group: UserGroupModel
) { }

  close(): void {
    this.dialogRef.close();
}
}
