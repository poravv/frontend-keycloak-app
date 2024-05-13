import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/user/users.service';
import { UserModel } from '../../model/UserModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InfoComponent } from './info/info.component';
import { AlertComponent } from '../alert/alert.component';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  isModelOpen = false;
  user!: UserModel;
  dataTable!: MatTableDataSource<UserModel>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'username', 'roles', 'accion'];

  constructor(
    private userService: UsersService,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    private oauthService: OAuthService
  ) { }

  ngOnInit(): void {
    this.getUserSucursal();
  }

  /*No se utiliza*/
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
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

  getUserSucursal() {

    const claims = this.oauthService.getIdentityClaims();
    const userId = claims['sub'] || [];

    this.userService.getUserId(userId).subscribe((userRes) => {
      console.log(userRes.attributes.sucursal[0]);
      const sucursalId = userRes.attributes.sucursal[0];
      this.userService.getAllUsersForSucursal(sucursalId).subscribe({
        next: (response) => {
          if (response) {
            this.dataTable = response;
            this.dataTable.paginator = this.paginator;
            this.dataTable.sort = this.sort;
          }
        }
      });

    });

  }

  confirmDelete(user: UserModel) {
    const alertRef = this._dialog.open(AlertComponent, {
      width: '400px',
      data: {
        title: 'Confirmar',
        message: `Confirma que desea eliminar el usuario ${user.username}`,
      },
    });
    alertRef.afterClosed().subscribe((result) => {
      if (result && user.id) {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            this.openMessage("Eliminacion satisfactoria ");
            this.getUserSucursal();
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

  openDialog(user: UserModel) {
    this._dialog.open(InfoComponent, {
      width: '500px',
      data: user,
    });
  }

}
