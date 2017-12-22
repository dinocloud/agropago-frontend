import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  displayedColumnsWithActions = ['code', 'date', 'card', 'amount', 'deadline', 'titular', 'beneficiary', 'actions'];
  displayedColumns = ['code', 'date', 'card', 'amount', 'deadline', 'titular', 'beneficiary'];
  dataSource = new MatTableDataSource(items);
  form: FormGroup;
  selectedValue: string;
  results = [
    {value: 0, viewValue: 'Referida'},
    {value: 1, viewValue: 'No Referida'}
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      today: new FormControl({value: new Date(), disabled: true}, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      amount: new FormControl('', Validators.required),
      card: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required),
      voucher: new FormControl('', Validators.required),
      aut: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
      result: new FormControl('', Validators.required),
      observation: new FormControl('', Validators.required)
    });
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
    date: "23/12/2018",
    card: "Galicia Rural",
    amount: "$1.233.131",
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez"
  },
  {
    code: 123,
    date: "22/12/2018",
    card: "Visa Rural",
    amount: "$1.233.131",
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez"
  },
  {
    code: 123,
    date: "22/12/2018",
    card: "Naranja Rural",
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
    card: "Mastercard rural",
    amount: "$1.233.131",
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez"
  }
];
