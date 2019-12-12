import { NotificationService } from './../../config/notification.service';
import { NewContractComponent } from './../new-contract/new-contract.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Document } from './../../class/Document';
import { ContractService } from './../contract.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatVerticalStepper } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-contract',
  templateUrl: './my-contract.component.html',
  styleUrls: ['./my-contract.component.scss']
})
export class MyContractComponent implements OnInit {
  displayedColumns: string[] = [
    'contractNumber',
    'title',
    'description',
    'acao'
  ];

  documents: Document[] = [];
  dataSource = new MatTableDataSource();
  paginatorOptions = [5, 10, 15];
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  formulario: FormGroup;
  constructor(
    private fb: FormBuilder,
    private contractService: ContractService,
    private alertService: NotificationService,
    public dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit() {
    this.mountForm();
    this.searchDocuments();
  }

  mountForm() {
    this.formulario = this.fb.group({
      contractNumber: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl('')
    });
  }

  async searchDocuments() {
    let filtro = {};
    filtro = {
      contractNumber: this.formulario.value.contractNumber
        ? this.formulario.value.contractNumber
        : null,
      title: this.formulario.value.title ? this.formulario.value.title : null,
      description: this.formulario.value.description
        ? this.formulario.value.description
        : null,
      publico: false,
      enabled: true
    };

    const response = await this.contractService
      .searchContracts(filtro)
      .toPromise();

    this.documents = response;
    this.montarTabela(this.documents);
  }
  montarTabela(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteContract(document) {
    console.log(document);
  }

  editContract(document) {}

  viewContract(document) {
    this.route.navigate([`view/${document.id}`]);
  }
}
