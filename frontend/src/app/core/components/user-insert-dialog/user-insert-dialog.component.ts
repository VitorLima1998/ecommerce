import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { FileUploadService } from '../../services/file-upload.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-insert-dialog',
  templateUrl: './user-insert-dialog.component.html',
  styleUrls: ['./user-insert-dialog.component.css'],
})
export class UserInsertDialogComponent {
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private uploadService: FileUploadService // private formBuilder: FormBuilder
  ) {
    this.fileName = '';
  }
  //-----------------------------------------------------------------------
  fileName: string;
  uploadedFiles: any[] = [];
  user!: User;
  selectedUser!: User;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  val!: string;
  // protected aFormGroup!: FormGroup;
  //-----------------------------------------------------------------------
  formUsers = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confPassword: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    // recaptcha: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.formUsers.get('name')!;
  }
  get email() {
    return this.formUsers.get('email')!;
  }
  get password() {
    return this.formUsers.get('password')!;
  }
  get confPassword() {
    return this.formUsers.get('confPassword')!;
  }
  get telephone() {
    return this.formUsers.get('telephone')!;
  }
  get cpf() {
    return this.formUsers.get('cpf')!;
  }
  get address() {
    return this.formUsers.get('address')!;
  }
  // get recaptcha() {
  //   return this.formUsers.get('recaptcha')!;
  // }

  //-----------------------------------------------------------------------
  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
    // this.aFormGroup = this.formBuilder.group({
    //   recaptcha: ['', Validators.required],
    // });
  }
  //-----------------------------------------------------------------------
  removeUser(id: string) {
    this.userService.removeUser(id);
  }
  //-----------------------------------------------------------------------
  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
  //-----------------------------------------------------------------------
  onSubmit() {
    if (this.fileName === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'No image inserted',
      });
      return;
    }
    this.fileName = `http://localhost:3000/api/user/img/${this.fileName}`;

    this.user = new User(
      this.formUsers.get('name')?.value as any,
      this.formUsers.get('email')?.value as any,
      this.formUsers.get('password')?.value as any,
      this.formUsers.get('confPassword')?.value as any,
      this.formUsers.get('telephone')?.value as any,
      this.formUsers.get('cpf')?.value as any,
      this.formUsers.get('address')?.value as any,
      this.fileName
    );
    this.ref.close(this.user);
  }
  //-----------------------------------------------------------------------
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  //-----------------------------------------------------------------------
  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileName = event.body.filename;
              // this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
