import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/user/users.service';
import { IUser } from '../../model/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Input() data: IUser | null = null;
  @Output() onCloseModel = new EventEmitter();
  userForm!:FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService,private toastr: ToastrService){
    this.userForm = this.fb.group({
    _id: [''],
    username:['',Validators.required],
    email:['',Validators.required],
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    password:['',Validators.required],
    roles:[]
    })
  }

  onClose(){
    this.onCloseModel.emit(false);
    this.userForm.reset();
  }

  ngOnChanges(): void {
    if (this.data) {
      this.userForm.patchValue({
        username: this.data.username,
        email: this.data.email,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        password: this.data.password,
      });
    }
  }

  onSubmit(){
    if (this.userForm.valid) {
      if (this.data) {
        this.usersService
          .updateUser(this.data.id as string, this.userForm.value)
          .subscribe({
            next: (response) => {
              this.resetUserForm();
              this.toastr.success(response.message);
            },
          });
      } else {
        this.usersService.createUser(this.userForm.value).subscribe((result)=>{
          //console.log(result);
            this.resetUserForm();
            this.toastr.success(result.message);
        });
      }
    } else {
      this.userForm.markAllAsTouched();
      //this.toastr.error("Complete datos requeridos");
    }
  }

  resetUserForm() {
    this.userForm.reset();
    this.onClose();
  }
}
