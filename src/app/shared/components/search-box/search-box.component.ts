import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input() placeholder: string = 'buscar';
  @Input() initialValue: string = '';
  @Output() onValue = new EventEmitter<string>();
  @Output() onDebounce = new EventEmitter<string>();
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSupcrition?: Subscription;
  ngOnInit(): void {
    this.debouncerSupcrition = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }
  ngOnDestroy(): void {
    this.debouncerSupcrition?.unsubscribe();
  }
  onEnterPressed(value: string): void {
    this.onValue.emit(value);
  }

  onkeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }
}
