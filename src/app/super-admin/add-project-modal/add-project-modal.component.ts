import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { SuperService } from 'src/app/services/super.service';
import { Project } from 'src/app/shared/project';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.css'],
  providers:[DatePipe]
})

export class AddProjectModalComponent implements OnInit {
  AddProject: FormGroup;
  error = '';
  sumitted = false;
  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<AddProjectModalComponent>,
    private formBuilder: FormBuilder,
    private superService: SuperService,
    private dateAdapter: DateAdapter<Date>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:Project) {
      this.dateAdapter.setLocale('fr-CA');
      this.local_data = {...data};
      this.action = this.local_data.action;
   }

   doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
   }

   closeDialog(){
     this.dialogRef.close({event:'Cancel'})
   }

  ngOnInit(): void {
    this.AddProject = this.formBuilder.group({
      ProjectName:['', Validators.required],
      ProjectShortName:[''],
      StartDate:[''],
      EndDate:[''],
      ProjectAddress:['', Validators.required],
      PoAmount:['', Validators.required],
      ClientName:['', Validators.required],
      ClientAddress:[''],
      StructuralConsultantName:['', Validators.required],
      StructuralConsultantAddress:[''],
      ArchitectName:['', Validators.required],
      ArchitectAddress:[''],
      TypeOfProject:['', Validators.required]
    });
  }

  OnSubmit(){
    this.sumitted = true;
    if (this.AddProject.invalid) {
      return;
    }
    this.superService.addProject(this.AddProject.value)
    .pipe(first())
    .subscribe({
      next:() =>{
        console.log("Project add successfull")
      }
    })
  }

}
