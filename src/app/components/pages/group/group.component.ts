import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../../model/UserModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { GroupInfoComponent } from './group-info/group-info.component';
import { AlertComponent } from '../alert/alert.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { GroupsService } from '../../services/groups/groups.service';
import { UserGroupModel } from '../../model/GroupsModel';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  isModelOpen = false;
  group!: UserGroupModel;
  dataTable!: MatTableDataSource<UserModel>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumns: string[] = ['name', 'path', 'accion'];

  constructor(
    private groupService: GroupsService,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    private oauthService: OAuthService
  ) { }

  ngOnInit(): void {
    this.getAllGroups();
  }

  /*No se utiliza*/
  getAllGroups() {
    this.groupService.getGroups().subscribe({
      next: (response) => {
        if (response) {
          //console.log(response)
          this.dataTable = response;
          this.dataTable.paginator = this.paginator;
          this.dataTable.sort = this.sort;
        }
      },
    });
  }

  confirmDelete(group: UserGroupModel) {
    const alertRef = this._dialog.open(AlertComponent, {
      width: '400px',
      data: {
        title: 'Confirmar',
        message: `Confirma que desea eliminar el grupo ${group.name}`,
      },
    });
    alertRef.afterClosed().subscribe((result) => {
      if (result && group.id) {
        this.groupService.deleteGroup(group.id).subscribe({
          next: () => {
            this.openMessage("Eliminacion satisfactoria ");
            this.getAllGroups();
          },
        });
      }
    })


  }

  openMessage(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3 * 1000
    });
  }

  openDialog(group: UserGroupModel) {
    this._dialog.open(GroupInfoComponent, {
      width: '500px',
      data: group,
    });
  }

}
