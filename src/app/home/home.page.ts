import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: any ={
    email: null,
    senha: null
  }

  id: any;
  
  recado = {
    id: null,
    assunto : null,
    mensagem : null
  }

  recados: any = [];
  constructor(
    public crudservice: CrudService,
    public authservice: AuthenticateService
  ){ 
    
}
  enviar(){
    this.crudservice.insert(this.recado, 'recados');
  }

  carregar(){
    this.recados = [];
    this.crudservice.fetchAll('recados')
    .then( (response) => {
      this.recados = (response)
      console.log(this.recados);
      
    })  //tiver sucesso
    .catch((erro) => {
      console.log(erro)
    }) //ocorrer um erro
    .finally(() => {
      console.log('Processo Finalizado')
    }) //quanto finalizar a requisição
  }

  remover(id: string){
    this.crudservice.remove(id, 'recados')
    this.carregar();
  }

  selecionar(recado: any) {
    this.id = recado.id;
    this.recado = recado.recado;
    // this.recado = mensagem;

  }

  atualizar(){
    this.crudservice.update(this.id, this.recado, 'recados')
  }

  registrar(){
    this.authservice.register(this.usuario.email, this.usuario.senha);
  }

  login(){
   this.authservice.login(this.usuario.email, this.usuario.senha) 
  }








//   pessoa = {
//     nome: 'Pombinha da paz Silva',
//     foto: 'https://professionalmoron.com/wp-content/uploads/2012/05/alpaca-985158_640.jpg',
//     objetivo: 'programar HTML & CSS',
//     contato:{
//     email: 'pombinho@hotmail.com',
//     telefone: '(11)99992992',
//     github: 'github.com/pombinha',
//     linkedin: 'linkedin.com/pombinha'
//     },
//     softskills:[
//       'Comunicação',
//       'Proatividade',
//       'Trabalho em Grupo'
//     ],
//     formacao:[
//       {ano_iniciado: '2021', ano_fim: '2024', instituicao: 'Etec Sales Gomes', curso: 'Técnico Desenvolvimento de sistemas'},
//       {ano_iniciado: '2025', ano_fim: '2027', instituicao: 'Faculdade de tecnologia - Fatec', curso: 'Superior em Desenvolvimento de sistemas'}
//     ],
//     projeto: [
//       {ano: '2023', instituicao: 'Etec Sales Gomes', nome_projeto: 'Etec de Portas Abertas', descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, impedit. Quam provident neque, mollitia iure vero doloribus quaerat, maxime perferendis sequi possimus corrupti illum error placeat explicabo id saepe ex.'}
//     ]
//   }
}
