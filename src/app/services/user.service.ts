import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<User[]> {
    return of([
      {
        id: 234234,
        name: 'Ron',
      },
      {
        id: 565633,
        name: 'Ronit',
      },
      {
        id: 678768554,
        name: 'Shiran',
      },
      {
        id: 4521465,
        name: 'Kobi',
      },
      {
        id: 56756,
        name: 'Simba',
      },
    ]);
  }
}
