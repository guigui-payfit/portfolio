import { ChangeDetectorRef, Component } from "@angular/core";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {
  TextTypingDirective,
  TYPING_CURSOR,
  TYPING_CURSOR_BLINKING_INTERVAL,
  TYPING_CURSOR_BLINKS,
  TYPING_INTERVAL,
  UNBREAKABLE_SPACE,
} from "./text-typing.directive";

@Component({
  imports: [TextTypingDirective],
  standalone: true,
  template: `<p appTextTyping>Type me.</p>`,
})
class FirstMockComponent {}

@Component({
  imports: [TextTypingDirective],
  standalone: true,
  template: `<p appTextTyping [delayTypingAfterWord]="'me'">
    Pause after me, then resume.
  </p>`,
})
class SecondMockComponent {}

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [SecondMockComponent],
  }).compileComponents();
});

describe("TextTypingDirective", () => {
  it(`should progressively type the inner text "Pause after me, then resume."
  with the blinking cursor at the end of typing.`, fakeAsync(() => {
    const mockFixture = TestBed.createComponent(FirstMockComponent);
    const mockDebugElement = mockFixture.debugElement;
    const changeDetectorReference =
      mockFixture.componentRef.injector.get(ChangeDetectorRef);
    mockFixture.detectChanges();
    changeDetectorReference.detectChanges();
    const elementReference = mockDebugElement.query(By.css("[appTextTyping]"));
    const htmlNode: Node = elementReference.nativeElement;
    const childTextNode = htmlNode.childNodes.item(0);

    tick(TYPING_INTERVAL);
    expect(childTextNode.nodeValue).toBe("T" + TYPING_CURSOR);

    tick(6 * TYPING_INTERVAL);
    expect(childTextNode.nodeValue).toBe("Type me" + TYPING_CURSOR);

    tick(TYPING_INTERVAL);
    expect(childTextNode.nodeValue).toBe("Type me." + UNBREAKABLE_SPACE);

    for (let i = 0; i < TYPING_CURSOR_BLINKS; i++) {
      tick(TYPING_CURSOR_BLINKING_INTERVAL);
      expect(childTextNode.nodeValue).toBe("Type me.|");

      tick(TYPING_CURSOR_BLINKING_INTERVAL);
      expect(childTextNode.nodeValue).toBe("Type me." + UNBREAKABLE_SPACE);
    }
  }));

  it(`should progressively type the inner text "Pause after me, then resume."
  with a marked break (cursor blinking) after the word "me"`, fakeAsync(() => {
    const mockFixture = TestBed.createComponent(SecondMockComponent);
    const mockDebugElement = mockFixture.debugElement;
    const changeDetectorReference =
      mockFixture.componentRef.injector.get(ChangeDetectorRef);
    mockFixture.detectChanges();
    changeDetectorReference.detectChanges();
    const elementReference = mockDebugElement.query(By.css("[appTextTyping]"));
    const htmlNode: Node = elementReference.nativeElement;
    const childTextNode = htmlNode.childNodes.item(0);

    tick(TYPING_INTERVAL);
    expect(childTextNode.nodeValue).toBe("P" + TYPING_CURSOR);

    tick(12 * TYPING_INTERVAL);
    expect(childTextNode.nodeValue).toBe("Pause after m" + TYPING_CURSOR);

    tick(TYPING_INTERVAL);
    expect(childTextNode.nodeValue).toBe("Pause after me" + UNBREAKABLE_SPACE);

    for (let i = 0; i < TYPING_CURSOR_BLINKS; i++) {
      tick(TYPING_CURSOR_BLINKING_INTERVAL);
      expect(childTextNode.nodeValue).toBe("Pause after me|");

      tick(TYPING_CURSOR_BLINKING_INTERVAL);
      expect(childTextNode.nodeValue).toBe(
        "Pause after me" + UNBREAKABLE_SPACE
      );
    }

    tick(TYPING_INTERVAL);
    expect(childTextNode.nodeValue).toBe("Pause after me," + TYPING_CURSOR);

    tick(12 * TYPING_INTERVAL);
    expect(childTextNode.nodeValue).toBe("Pause after me, then resume|");

    tick(TYPING_INTERVAL);
    expect(childTextNode.nodeValue).toBe(
      "Pause after me, then resume." + UNBREAKABLE_SPACE
    );
  }));
});
