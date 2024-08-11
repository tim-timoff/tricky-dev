import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, forwardRef, HostBinding, Input, QueryList, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICheckableTagState, TTagKey } from './tag.model';
import { ChipComponent } from './chip.component';
import { map, tap } from 'rxjs';

@Component({
  selector: 'tricky-chip-control',
  standalone: true,
  imports: [
    NgIf
  ],
  template:`
    <label
      *ngIf="hasLabel"
      [innerText]="label"
    ></label>
    <div class="tag-container" >
      <ng-content select="tricky-chip"></ng-content>
    </div>
  `,
  styleUrl: './chip-control.component.less',
  providers: [
  // DestroyListenerService,
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting:forwardRef(() => ChipControlComponent),
    multi: true,
  }
],
changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ChipControlComponent implements ControlValueAccessor{
  writeValue(value: Map<TTagKey, boolean>): void {
    if (value) {
      this.state.set(value);
      this.tagList?.forEach(tag => {
        tag.checked = value.get(tag.key) || false;
      });
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  private state = signal<Map<TTagKey, boolean>>(new Map<TTagKey, boolean>());
  @Input('multiple') multiple: boolean = false;
  @Input('scrollable') @HostBinding('class.chip-control--scrollable') scrollable: boolean = false;
  @Input('label') label?: string;
  @HostBinding('class.chip-control') readonly ChipControlClass = true;
  @ContentChildren(ChipComponent) tagList!: QueryList<ChipComponent>;

  private onChange: (value: Map<TTagKey, boolean>) => void = () => {};
  private onTouched: () => void = () => {};

  touch(): void {
    this.onTouched();
  }

  get allTag() {
    return this.tagList.find(tag => tag.key === 'All');
  }

  get hasLabel(): boolean {
    return typeof this.label === 'string' && this.label.trim().length > 0;
  }

  private markAllTagsCheckable() {
    this.tagList?.forEach(tag => {
      tag.checkable = true;
    });
  }

  private allTagHandler() {
    if (!this.allTag || !this.multiple) { return; }

    this.tagList
      .filter(tag => tag.key !== 'All')
      .every(tag => tag.checked)
        ? this.allTag.checked = true
        : this.allTag.checked = false;
  }

  private multipleHandler(state: ICheckableTagState) {
    if (!this.allTag || !this.multiple) { return; }

    if (state.key === this.allTag?.key) {
      this.tagList.forEach(tag => {
        tag.checked = this.allTag!.checked;
      });
    }

    this.allTagHandler();
  }

  private nonMultipleHandler(state: ICheckableTagState) {
    if (this.multiple) { return; }

    this.tagList
      .filter(tag => tag.key !== state.key)
      .forEach(tag => tag.checked = false);
  }

  private setMap(map: Map<TTagKey, boolean>) {
    this.tagList.forEach(tag =>
      map.set(tag.key, tag.checked)
    )
    return map;
  }

  private updateState(state: ICheckableTagState) {
    this.multiple
    ? this.multipleHandler(state)
    : this.nonMultipleHandler(state);

    this.state.update((map) => this.setMap(map));
    this.onChange(this.state())
  }

  ngAfterViewInit(): void {
    this.markAllTagsCheckable();

    this.tagList.forEach(tag => {
      tag.checkableChange.pipe(
        map(
          state => this.updateState(state)
        ),
        // this.destroyService.takeUntilDestroy$
      ).subscribe()
    });
  }
}
