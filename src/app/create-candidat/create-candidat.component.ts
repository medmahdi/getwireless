import { Component, OnInit } from '@angular/core';
import {NgForm} from  '@angular/forms';
import { TaskService } from '../task.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-create-candidat',
  templateUrl: './create-candidat.component.html',
  styleUrls: ['./create-candidat.component.css'],
  providers:[TaskService]
})
export class CreateCandidatComponent implements OnInit {
  filePhoto:File=null;
  fileCv: File = null;
  message_valide:boolean;
  message_error:boolean;
  constructor(private taskService:TaskService , private router : Router ) { }

/***************Read Uplode File **********************/


fileProgressImage(file:FileList) {
  this.filePhoto=file.item(0);
  var reader=new FileReader();
reader.readAsDataURL(this.filePhoto);
}
fileProgressPdf(file:FileList) {
  this.fileCv=file.item(0);
  var reader=new FileReader();
reader.readAsDataURL(this.fileCv);
}
/*************************************/
cvname:String;
phtotname:String;

  ngOnInit() {
    
  }
  onSubmit(form: NgForm) {
    let formData = new FormData();
    formData.append("uploads", this.fileCv, this.fileCv.name);
    let formData2 = new FormData();
    formData2.append("uploads", this.filePhoto, this.filePhoto.name);
    this.taskService.UplodeFile(formData).subscribe((response)=>{
     this.cvname=response["message"];
     this.taskService.UplodeFile(formData2).subscribe((response)=>{
       this.phtotname=  response["message"];
 
 
       if( this.phtotname.length>0 &&this.cvname.length>0)
       {
       
             var candidat={
               nom:form.value["NomCandidat"],
               prenom:form.value["Prenom_Candidat"],
               email:form.value["Email_Candidat"],
               numero_cin:form.value["Cin_Candidat"],
               photo:this.phtotname,
               cv:this.cvname,
               password:form.value["passwd"],
              }
       
       
             this.taskService.ajouterCandidat(candidat).subscribe((res)=>{
       
               if(res["msg"]=="Post request is working")
               {
                 this.message_valide=true;
                 this.message_error=false;
                 form.reset();
               }
               else
               {
                 this.message_error=true;
                 this.message_valide=false;
               }
               if (res.success){
                 this.router.navigate(['Acceuil'])
               }
           });
            }
 
     });
 
    });
    

  }
}
