import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { IsActiveMatchOptions } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  // isAuthenticated = false;
  constructor(
    public modal: ModalService,
    public auth: AuthService,
  ) {  // we can now remove this subscription bec we are subscribing from the template using async pipe
   /*  this.auth.isAuthenticated$.subscribe(status => {
      this.isAuthenticated = status 
    }) */
  }
  openModal($event: Event){
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }
  readonly myMatchOptions: IsActiveMatchOptions = {
    matrixParams: 'exact',
    queryParams: 'ignored',
    paths: 'exact',
    fragment: 'exact'
  }
}
