import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  roleForm: FormGroup;
  roleSubmitted: boolean;
  accessData = [];
  @Input() rolesData: any[] = [];
  @Output() submitRoleData: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.initializeRoleForm();
    this.accessData = [...this.rolesData]
  }

  initializeRoleForm() {
    this.roleForm = this.formBuilder.group({
      roleCode: ["", Validators.required],
      roleName: ["", Validators.required]
    });
  }

  get f() {
    return this.roleForm.controls;
  }

  addRoleToApplication() {
    this.roleSubmitted = true;
    if (this.roleForm.invalid) {
      return;
    }

    this.accessData.push({
      AccessCode: this.roleForm.value.roleCode, AccessName: this.roleForm.value.roleName
    });
  }

  onSubmitRoleMapping() {
    this.roleSubmitted = true;
    if (this.roleForm.invalid) {
      return;
    }
    this.submitRoleData.emit(this.accessData);
  }

  closeRoleDialog() {
    this.roleForm.reset();
    this.accessData = [];
  }

  deleteRoleById(index) {
    this.accessData.splice(index, 1);
  }

}
