import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { UserInsertDialogComponent } from '../user-insert-dialog/user-insert-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    MessageService,
  ],
})
export class UsersComponent implements OnInit {
  users!: User[];

  constructor(
    public dialogService: DialogService,
    private userService: UserService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  // Inicializa a lista de users
  ngOnInit() {
    this.getUsers();
  }

  // Open Dialog -> chama o Component UserInsertDialog onde insere os dados para criação do usuário
  show() {
    const ref = this.dialogService.open(UserInsertDialogComponent, {
      header: 'Add User',
    });

    ref.onClose.subscribe({
      next: (user: User) => {
        this.userService.addUser(user).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              detail: 'User added successfully!',
            });
            this.getUsers();
          },
        });
      },
    });
  }

  // LIST PRODUCT
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (user) => {
        this.users = user;
      },
      error: () => {
        console.error();
      },
    });
  }

  // REMOVE USER
  async removeUser(id: string) {
    await this.userService.removeUser(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          detail: 'User removed successfully!',
        });
        this.getUsers();
      },
      error: () => {
        console.error();
      },
    });
  }
}
