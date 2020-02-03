import { tap } from 'rxjs/operators';
import { UserProfile } from './../../models/user-profile.model';
import { Observable } from 'rxjs';
import { ApiService } from './../../../core/services/api.service';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileStorageService {
  svcEndpoint = 'profile';
  constructor(
    private api: ApiService,
    private profileService: ProfileService
  ) {}

  fetchProfile(userId: string): Observable<UserProfile> {
    if (this.profileService.userProfileChange.value) {
      return this.profileService.getUserProfile();
    } else {
      return this.api.getOne(this.svcEndpoint, userId).pipe(
        tap((profile: UserProfile) => {
          this.profileService.setUserProfile(profile);
        })
      );
    }
  }

  saveProfile(item: UserProfile, userId: string) {
    return this.api.saveOne(this.svcEndpoint, item, userId).then(() => {
      this.profileService.setUserProfile(item);
    });
  }
}
