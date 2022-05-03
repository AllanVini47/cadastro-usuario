import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { IUsuarioDataSource, UsuarioService } from './usuario.service';

@Component({
  templateUrl: './usuario.list.component.html',
  styleUrls: ['./usuario.list.component.css'],
})
export class UsuarioListComponent implements OnInit, AfterViewInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  public columnsToDisplay = ['id', 'nome', 'dataNascimento', 'foto', 'acoes'];
  public dataSource = new MatTableDataSource<Usuario>();

  public pageSize: number = 5;
  public pageIndex: number = 0;
  public pageTotal: number = 0;

  constructor(
    private _service: UsuarioService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    this._getUsuarios(this.pageIndex + 1);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public announceSortChange(sortState: Sort): void {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this._getUsuarios(this.pageIndex + 1);
  }

  private _getUsuarios(pageIndex: number): void {
    this._subscriptions.push(
      this._service
        .getUsuarios(pageIndex, this.pageSize)
        .subscribe((dataSource: IUsuarioDataSource) => {
          this.dataSource.data = dataSource.Usuarios;
          this.pageTotal = dataSource.Total;
        })
    );
  }
}
