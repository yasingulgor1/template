import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//Repositories
import { MeRepository } from '../../api/repositories/me.repository';

//Models
import { Me } from '../../api/models/me';

import { Observable, Subject, asapScheduler, of, pipe, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { map, take, catchError } from "rxjs/operators";




@Injectable()
export class ManagerGuard implements CanActivate {

  constructor(public meRepository: MeRepository, public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.meRepository.get().pipe(map((me: Me) => {
      if (me.isMasterAdmin) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }))
  

  }


}