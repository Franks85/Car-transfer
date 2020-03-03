import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class DOMHelper<T> {
  constructor(private fixture: ComponentFixture<T>) {}

  getSingleElText(tagName: string): string {
    const el = this.fixture.debugElement.query(By.css(tagName));
    if (el) {
      return el.nativeElement.textContent;
    }
  }

  getSingleDomEl(tagName: string): HTMLElement {
    const el = this.fixture.debugElement.query(By.css(tagName));
    if (el) {
      return el.nativeElement;
    }
  }

  countEl(tagName: string): number {
    const elements = this.fixture.debugElement.queryAll(By.css(tagName));
    return elements.length;
  }

  clickBtn(btnText: string) {
    this.findAll('button').forEach(btn => {
      const btnEl: HTMLButtonElement = btn.nativeElement;
      if (btnEl.textContent === btnText) {
        btnEl.click();
      }
    });
  }

  findAll(tagName: string) {
    return this.fixture.debugElement.queryAll(By.css(tagName));
  }
}
