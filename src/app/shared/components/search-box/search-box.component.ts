import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent {
  @Input() placeholder: string = 'buscar';
  @Output() onValue = new EventEmitter<string>();

  onEnterPressed(value: string): void {
    this.onValue.emit(value);
  }
}
