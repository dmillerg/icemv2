import { Component, ViewChild, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { Table } from './model/table.model';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BotonGenericoComponent } from '../boton-generico/boton-generico.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-table-generico',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BotonGenericoComponent,
  ],
  templateUrl: './table-generico.component.html',
  styleUrls: ['./table-generico.component.scss'],
})
export class TableGenericoComponent implements OnDestroy{
  @Input() table!: Table;
  columnas: string[] = [];
  columnasTodas: string[]=[];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly breakpoint$ = this._breakpointObserver
        .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small])
        .pipe(distinctUntilChanged());
    private breakpointSub!: Subscription;


  constructor(private paginators: MatPaginatorIntl, private _breakpointObserver: BreakpointObserver,) {
    paginators.itemsPerPageLabel = 'elementos por página';
  }
  ngAfterViewInit() {
    this.columnasTodas= this.table.columnas.map((e) => e.campo);
    this.columnas = [...this.columnasTodas];
    this.dataSource = new MatTableDataSource<any>(this.table.values);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.breakpointSub = this.breakpoint$.subscribe({
      next: () => this.breakpointChanged(),
  });
  }

  ngOnDestroy(): void {
    this.breakpointSub.unsubscribe();
  }

  private breakpointChanged() {
    if (this._breakpointObserver.isMatched(Breakpoints.Large)) {
        this.columnas = this.table.columnas.map((e) => e.campo);
    } else if (this._breakpointObserver.isMatched(Breakpoints.Medium)) {
        this.columnas = [...this.columnasTodas];
    } else if (this._breakpointObserver.isMatched(Breakpoints.Small)) {
        this.columnas = [this.columnasTodas[0],this.columnasTodas[1]];
    } else if (this._breakpointObserver.isMatched(Breakpoints.XSmall)) {
        this.columnas = [this.columnasTodas[0],this.columnasTodas[1]];
    } else {
        this.columnas = [...this.columnasTodas];
    }
}
}
