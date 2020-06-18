import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[TaskService]
})
export class LoginComponent implements OnInit {
  message_error:boolean;
  constructor(private route: ActivatedRoute,private taskService:TaskService,private router:Router) { }

  ngOnInit() {
    
   /* this.taskService.getIdToken(localStorage.getItem("token")).subscribe((res)=>
    {
      alert(res);
    })*/
  }

  
  onSubmit(form: NgForm) {
    var Login={
      email:form.value["username"],
      password:form.value["password"],
    }
       
    this.taskService.authentification(Login).subscribe((res)=>{
       
      if(res["token"]!="")
      {
        localStorage.setItem("token",res["token"]);
        localStorage.setItem("usertype","Candidat");
        this.router.navigate(['/Acceuil']);
      }
      else
      {
        this.message_error=true;
      }
  });

  }

}
