import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { ETagColor, ICheckableTagState, TTagColor, TTagKey, TTagSize } from './chip.model';
// import { InputBoolean } from '@shared/input-transforms/input-boolean.transform';
// import { isNonEmptyString } from '@shared/utils/helpers';
import { CheckAllTagDirective } from './all-checked.directive';

@Component({
  selector: 'tricky-chip',
  template: `<ng-content></ng-content>`,
  standalone: true,
  styleUrls: ['./chip.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ceres-tag',
    '[class.ceres-tag--checkable]': 'isCheckableSignal()',
    '[class.ceres-tag--checked]': 'checked',
    '[style.--ceres-tag-color]': 'tagColorSignal()',
    '[attr.size]': 'size',
  }
})
export class TrickyChipComponent {
  private readonly _isCheckAll: boolean = !!inject(CheckAllTagDirective, { optional: true });
  private _key: TTagKey = null;

  tagColorSignal: WritableSignal<TTagColor> = signal(ETagColor['gray']);
  isCheckableSignal: WritableSignal<boolean> = signal(false);

  @Input('size') size: TTagSize = 'normal';
  @Input('checked') checked: boolean = false;

  @Input('color')
  set color(value: TTagColor) {
    // if (!isNonEmptyString(value)) { return; }
    //@ts-ignore
    this.tagColorSignal.set(ETagColor[value] || value);
  }

  @Input('checkable')
  set isCheckable(value: boolean) {
    this.isCheckableSignal.set(value);
  }

  @Input('key')
  set key(value: TTagKey) {
    if (this._isCheckAll) { return; }
    this._key = value;
  }

  get key() {
    return this._key;
  }

  @Output('checkableChange') checkableChange: EventEmitter<ICheckableTagState> = new EventEmitter<ICheckableTagState>();

  @HostListener('click')
  clickHandler() {
    if (!this.isCheckableSignal()) { return; }

    this.checked = !this.checked;

    this.checkableChange.emit({
      key: this.key,
      checked: this.checked,
      isCheckAll: this._isCheckAll,
    });
  }
}
