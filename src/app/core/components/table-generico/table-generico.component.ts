import {
  Component,
  ViewChild,
  Input,
  OnDestroy,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-table-generico',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BotonGenericoComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './table-generico.component.html',
  styleUrls: ['./table-generico.component.scss'],
})
export class TableGenericoComponent implements OnDestroy, OnChanges {
  @Input() table!: Table;
  @Input() seleccionableRow: boolean = false;
  @Input() maximoRowSeleccionable: number = 1;
  @Output() select = new EventEmitter<any>();

  columnas: string[] = [];
  columnasTodas: string[] = [];
  dataSource!: MatTableDataSource<any>;
  columnasSeleccionadas = new Set<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly breakpoint$ = this._breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small])
    .pipe(distinctUntilChanged());
  private breakpointSub!: Subscription;

  constructor(
    private paginators: MatPaginatorIntl,
    private _breakpointObserver: BreakpointObserver
  ) {
    paginators.itemsPerPageLabel = 'elementos por página';
    paginators.firstPageLabel = 'primera página';
    paginators.lastPageLabel = 'última página';
    paginators.nextPageLabel = 'siguiente página';
    paginators.previousPageLabel = 'anterior página';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.construirTabla();
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
      this.columnas = [this.columnasTodas[0], this.columnasTodas[1]];
    } else if (this._breakpointObserver.isMatched(Breakpoints.XSmall)) {
      this.columnas = [this.columnasTodas[0], this.columnasTodas[1]];
    } else {
      this.columnas = [...this.columnasTodas];
    }
    this.addAcciones();
  }

  construirTabla() {
    this.columnasTodas = this.table.columnas.map((e) => e.campo);
    this.columnas = [...this.columnasTodas];
    this.addAcciones();
    if (!this.breakpointSub)
      this.breakpointSub = this.breakpoint$.subscribe({
        next: () => this.breakpointChanged(),
      });
    this.dataSource = new MatTableDataSource<any>(this.table.values);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  mostrar(item: any) {
    if (this.columnasSeleccionadas.has(item)) {
      this.columnasSeleccionadas.delete(item);
    } else {
      if (this.columnasSeleccionadas.size === this.maximoRowSeleccionable) {
        let iterador = this.columnasSeleccionadas.values();
        let first = iterador.next().value;
        this.columnasSeleccionadas.delete(first);
      }
      this.columnasSeleccionadas.add(item);
    }
    this.select.emit(this.columnasSeleccionadas.values().next().value);
  }

  addAcciones() {
    if (this.table.acciones) this.columnas.push('acciones');
  }
}
