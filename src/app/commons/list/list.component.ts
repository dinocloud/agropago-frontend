import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['code', 'date', 'card', 'amount', 'deadline', 'titular', 'beneficiary', 'actions'];
  dataSource = new MatTableDataSource(items);

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  edit(e){
    alert("hola")
  }
}


export interface Element {
  code: number;
  date: string;
  card: string;
  amount: string;
  deadline: number,
  titular: string,
  beneficiary: string
}

const items: Element[] = [
  { code: 123,
    date: "22/12/2018",
    card: "Galicia Rural",
    amount: "$1.233.131",
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez"
  },
  {
    code: 123,
    date: "22/12/2018",
    card: "Galicia Rural",
    amount: "$1.233.131",
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez"
  },
  {
    code: 123,
    date: "22/12/2018",
    card: "Galicia Rural",
    amount: "$1.233.131",
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez"
  },
  {
    code: 123,
    date: "22/12/2018",
    card: "Galicia Rural",
    amount: "$1.233.131",
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez"
  },
  {
    code: 123,
    date: "22/12/2018",
    card: "Galicia Rural",
    amount: "$1.233.131",
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez"
  },
  {
    code: 123,
    date: "22/12/2018",
    card: "Galicia Rural",
    amount: "$1.233.131",
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez"
  }
];
