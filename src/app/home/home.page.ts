import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  filter: string = `fields=name,borders,flags`;
  url: string = `https://restcountries.com/v3.1/all?${this.filter}`;
  dados: any = {};
  isLoading: boolean = false;

  constructor( 
  ){ 
    this.isLoading = true;

    fetch(this.url)
    .then(
      dados => dados.json()
    )
    .then(
      dados =>{
        console.log(dados)
        this.dados = dados
      }
    )
    .catch(_ =>{
      console.log(_)
    })
    .finally(()=>{
      console.log("Requisição Finalizada");
      this.isLoading = false;
    })
  }

}
