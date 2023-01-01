import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService],
})
export class UsersComponent implements OnInit {
  users!: User[];

  constructor(
    // public dialogService: DialogService,
    private userService: UserService,
    // public ref: DynamicDialogRef,
    // public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  // REMOVE USER
  async removeUser(id: string) {
    await this.userService.removeUser(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          detail: 'Product removed successfully!',
        });
        this.getUsers();
      },
      error: () => {
        console.error();
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

    // this.getProducts();
  }

  update() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Updated',
    });
  }

  delete() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Delete',
      detail: 'Data Deleted',
    });
  }
}

// Open Dialog -> chama o Component UserInsertDialog onde o usuário irá adicionar os dados
// show() {}
