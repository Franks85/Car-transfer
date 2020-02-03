import { ProfileService } from '../../../services/profile/profile.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  title = 'Modifica';
  constructor(
    public profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ProfileFormComponent>
  ) {}

  ngOnInit() {
    this.profileService.inizializedFormGroup(this.data);
  }

  onSubmit() {
    const { record } = this.data;
    const newValue = this.profileService.formDialog.value.record;
    if (this.profileService.formDialog.valid) {
      const oldProfile = this.profileService.userProfileChange.value;

      if (oldProfile[record] === newValue) {
        this.onDialogClose();
      } else {
        const newProfile = { ...oldProfile, [record]: newValue };
        this.profileService.userProfileChange.next(newProfile);
        this.onDialogClose();
      }
    }
  }

  onDialogClose() {
    this.profileService.formDialog.reset();
    this.dialogRef.close();
  }

}
