import { Injectable } from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../component/confirm-dialog/confirm-dialog.component';
import {MessageDialogComponent} from '../component/message-dialog/message-dialog.component';
import {Observable} from 'rxjs';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  public confirm(): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title:"Confirmação",
        message:"Deseja realmente excluir o registro?"
      }
    });
    return dialogRef.afterClosed();
  }


  public info(message: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        type:"info",
        title:"Informação",
        message:message
      }
    });
    return dialogRef.afterClosed();
  }

  public error(message: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        type:"error",
        title:"Erro",
        message:message
      }
    });
    return dialogRef.afterClosed();
  }

}
