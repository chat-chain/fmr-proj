import { Component, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.interface';

@Component({
  selector: 'user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserForm {
  private fb = inject(NonNullableFormBuilder);

  userSubmit = output<User>();
  cancel = output<void>();

  userForm: FormGroup = this.fb.group({
    id: [null, [Validators.required]],
    name: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userSubmit.emit(this.userForm.value);
      this.userForm.reset();
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.userForm.reset();
  }
}
