import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from './store';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  createStore: FormGroup;
  submited = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createStore = this.fb.group({
      name: ['', Validators.required],
      created_at: ['', Validators.required],
      created_by: ['', Validators.required],
      store_adress: ['', Validators.required],
    });
  }

  get f() {
    return this.createStore.controls;
  }

  onSubmit() {
    this.submited = true;
    const data = new Store();

    data.name = this.createStore.get('name').value;
    data.created_at = this.createStore.get('created_at').value;
    data.created_by = this.createStore.get('created_by').value;
    data.store_adress = this.createStore.get('store_adress').value;

    console.log(data);
  }
}
