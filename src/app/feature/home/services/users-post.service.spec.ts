import { TestBed } from '@angular/core/testing';

import { UsersPostService } from './users-post.service';

describe('UsersPostService', () => {
  let service: UsersPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
