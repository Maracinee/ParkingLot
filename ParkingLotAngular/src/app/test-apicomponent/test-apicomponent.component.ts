//TOBEDELETED
import { Component, OnInit } from '@angular/core';
import { TestModel } from '../models/test-model';
import { TestServiceService } from '../services/test-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-apicomponent',
  templateUrl: './test-apicomponent.component.html',
  styleUrls: ['./test-apicomponent.component.scss']
})
export class TestAPIComponentComponent implements OnInit {

  private http : HttpClient;
  private baseUrl = 'https://localhost:7135/api/CarTypes/1';
  //constructor(private service : TestServiceService) { }

  constructor(private client : HttpClient, private service : TestServiceService){
    this.http = client;
  }

  ngOnInit(): void {
  }

  public test(){
    this.service.testAPI();
    //return this.http.get(this.baseUrl);
  }

}
