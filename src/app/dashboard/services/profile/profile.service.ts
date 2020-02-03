import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile } from './../../models/user-profile.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userProfileChange = new BehaviorSubject<UserProfile>(null);
  private profile: UserProfile;
  formDialog: FormGroup = new FormGroup({
    record: new FormControl('', Validators.required)
  });
  constructor() {}

  inizializedFormGroup(data: any) {
    this.formDialog.setValue({
      record: data.value
    });
  }

  setUserProfile(profile: UserProfile) {
    this.profile = {...profile};
    this.userProfileChange.next(this.profile);
  }

  getUserProfile(): Observable<UserProfile> {
    return this.userProfileChange.asObservable();
  }
  
}
