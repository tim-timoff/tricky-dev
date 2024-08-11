import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ETagColor, ICheckableTagState } from './tag.model';
import { NgFor, NgForOf } from '@angular/common';


@Component({
  selector: 'tricky-chip',
  standalone: true,
  imports: [ NgForOf, NgFor ],
  template: `
     <ng-content></ng-content>
  `,
  styleUrl: './chip.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.checkable)
  }
  private _color: ETagColor = ETagColor['gray'];
  @Input('key') key: string = '';
  @Input('size') @HostBinding('attr.size') size: 'normal' | 'small' = 'normal';
  @Input('checked') @HostBinding('attr.checked') checked: boolean = false;
  @Input('checkable') @HostBinding('class.ceres-tag--checkable') checkable: boolean = true;
  @Input('color')
  set color(value: ETagColor | string) {
    //@ts-ignore
    // this._color = ETagColor[value.toString()] || value;
    this._color = value;
  }
  get color() {
    return this._color;
  }
  @Output('checkableChange') checkableChange: EventEmitter<ICheckableTagState> = new EventEmitter<ICheckableTagState>();

  @HostBinding('class.tricky-tag') readonly ceresTagClass = true;
  @HostBinding('style.borderColor') get borderColor(): ETagColor | string {
    return this.color;
  };

  @HostBinding('style.backgroundColor') get backgroundColor(): ETagColor | null | string {
    return this.checked ? this.color : null;
  }

  @HostListener('click') clickHandler() {
    if (!this.checkable) { return; }
    this.checked = !this.checked;
    const changes: ICheckableTagState = {
      key: this.key,
      checked: this.checked,
    };

    this.checkableChange.next(changes);
  }
}
