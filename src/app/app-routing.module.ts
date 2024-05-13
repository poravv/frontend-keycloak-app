import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { UsersComponent } from './components/pages/users/users.component';
import { UserFormComponent } from './components/pages/users/user-form/user-form.component';
import { GroupComponent } from './components/pages/group/group.component';
import { GroupFormComponent } from './components/pages/group/group-form/group-form.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'users', 
    children:[
      {path:'list',component: UsersComponent},
      {path:'create',component: UserFormComponent},
      {path:'edit/:id',component: UserFormComponent}
    ]
  },
  {path:'group', 
    children:[
      {path:'list',component: GroupComponent},
      {path:'create',component: GroupFormComponent},
      {path:'edit/:id',component: GroupFormComponent}
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
