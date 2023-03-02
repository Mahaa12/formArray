import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
interface City {
  id: number;
  name: string;

}
@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})

export class FormArrayComponent implements OnInit {
  planPackagesform1: FormGroup;
  services!: City[];
  selectedSerives = new Set<string>();
  skillsForSelectedPath: any = [];
  serviceTypeId12
  constructor(private fb: FormBuilder) {
    this.planPackagesform1 = this.fb.group({
      services: this.fb.array([this.newServices1()]),
    });
    this.services = [
      {
        id: 20,
        name: 'def',
      },
      {
        id: 11,
        name: 'ddecedcece',
      },
      {
        id: 1,
        name: 'fvvfrfef',
      },
      {
        id: 2,
        name: 'ecfedvedv',
      },
    ];
  }

  ngOnInit(): void {
  }
  /** services */
  services1(): FormArray {
    return this.planPackagesform1.get("services") as FormArray;

  }

  newServices1(): FormGroup {
    return this.fb.group({
      serviceTypeId: ["", Validators.required],
      subscriptionPlanPackages: this.fb.array([]),
    });
  }

  addServices1() {
   //this.services1().push(this.newServices1());
    const creds = this.planPackagesform1.controls.services as FormArray;
    creds.push(this.newServices1());

    this.services = this.services.filter(
      (city) => !this.selectedSerives.has(city.id.toString())

    );

    console.log("this.services")

    console.log(this.services)

  }

  removeServices(ti) {
    this.services1().removeAt(ti);
  }

  /** subscriptionPlanPackages */

  subscriptionPlanPackages(ti): FormArray {
    return this.services1().at(ti).get("subscriptionPlanPackages") as FormArray;
  }

  newSubscriptionPlanPackages(): FormGroup {
    return this.fb.group({
      from: ["", [Validators.required, Validators.pattern("[0-9]+")]],
      to: ["", [Validators.required, Validators.pattern("[0-9]+")]],
      messagePrice: ["", [Validators.required, Validators.pattern("[0-9]+")]],
      buttonPrice: ["", [Validators.required, Validators.pattern("[0-9]+")]],
    });
  }

  addPlanPackages(ti: number) {
    this.subscriptionPlanPackages(ti).push(this.newSubscriptionPlanPackages());
  }

  removePlanPackages(ti: number, bi: number) {
    const control = this.subscriptionPlanPackages(ti);
    control.removeAt(control.length - 1);
  }

  selected(event, index) {
    console.log(event);
    if (event) {
    this.selectedSerives.add(event);
    this.skillsForSelectedPath[index] = event;
    this.services = this.services.filter((city) => city.id !== event);
  }
  }




}
