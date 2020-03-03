import { ProfileStorageService } from './../../dashboard/services/profile/profile-storage.service';
import { AuthService } from './auth.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  const createService = createServiceFactory(AuthService);

  beforeEach(() => spectator = createService());

  fit('should be created', () => {
    expect(spectator.service).toBeDefined();
  });

  describe('Authentication', () => {
    beforeEach(() => {});

    describe('autoLogin', () => {
      beforeEach(() => {});

      it('should autoLogin return if no user in localstorage', () => {});

      it('should autoLogin get values from localstorage', () => {});

      it('should autoLogin call autoLogout if token exist on localstorage user values', () => {});
    });

    it('should autologin', () => {});
  });
});
