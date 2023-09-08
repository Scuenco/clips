import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[app-event-blocker]' //default name was appEventBlocker
})
export class EventBlockerDirective {

  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  public handleEvent(event: Event) {
    event.preventDefault()
    event.stopPropagation()
  }
  
}
