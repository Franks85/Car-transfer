import { ProfileStorageService } from './../services/profile/profile-storage.service';
import { NotificationService } from '../../ui/services/notification.service';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';
import { AuthService } from '../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile/profile.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-data',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  error: string = null;
  userId: string;
  userProfile$: Observable<UserProfile>;
  currentProfile: UserProfile;
  constructor(
    private authService: AuthService,
    private profileStorageService: ProfileStorageService,
    private profileService: ProfileService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userId = this.authService.user.value.id;
    const fetchedProfile$ = this.profileStorageService.fetchProfile(
      this.userId
    );
    this.userProfile$ = fetchedProfile$.pipe(
      switchMap(() => this.profileService.getUserProfile())
    );
  }

  onChangeButtonClick(record: string, value: string) {
    this.dialog.open(ProfileFormComponent, {
      disableClose: true,
      autoFocus: true,
      width: '350px',
      data: { value, record }
    });
  }

  onSaveButtonclick() {
    this.currentProfile = this.profileService.userProfileChange.value;
    this.profileStorageService.saveProfile(this.currentProfile, this.userId);
    this.notificationService.success('Modifiche correttamente salvate!');
  }
}
