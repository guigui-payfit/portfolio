import { AfterViewInit, Directive, ElementRef, Input } from "@angular/core";
import { concat, interval, Observable, take, tap } from "rxjs";

export const TYPING_CURSOR = "|";
export const TYPING_CURSOR_BLINKING_INTERVAL = 500; // expressed in milliseconds
export const TYPING_CURSOR_BLINKS = 2;
export const TYPING_INTERVAL = 50; // expressed in milliseconds
export const UNBREAKABLE_SPACE = "\u00a0";

@Directive({
  selector: "[appTextTyping]",
  standalone: true,
})
export class TextTypingDirective implements AfterViewInit {
  private _alreadyTypedText = "";
  private _charactersToType!: string[];

  @Input() public delayTypingAfterWord?: string;

  constructor(private readonly elementReference: ElementRef) {}

  public ngAfterViewInit(): void {
    const htmlNode: Node = this.elementReference.nativeElement;
    const childTextNode = htmlNode.childNodes.item(0);

    if (childTextNode.nodeValue === null) {
      return;
    }

    const textToType = childTextNode.nodeValue.trim();
    this._charactersToType = textToType.split("");
    const numberOfCharactersToType = this._charactersToType.length;

    const firstPartToTypeCharacterNumber =
      this.delayTypingAfterWord !== undefined
        ? textToType.indexOf(this.delayTypingAfterWord) +
          this.delayTypingAfterWord.length
        : numberOfCharactersToType;

    const secondPartToTypeCharacterNumber =
      numberOfCharactersToType - firstPartToTypeCharacterNumber;

    const firstPartTypingObservable = this._typeCharacters(
      childTextNode,
      firstPartToTypeCharacterNumber
    );

    const typingCursorBlinkingObservable = interval(
      TYPING_CURSOR_BLINKING_INTERVAL
    ).pipe(
      take(TYPING_CURSOR_BLINKS * 2),
      tap((emittedNumber) => {
        if (emittedNumber % 2 === 0) {
          childTextNode.nodeValue = this._alreadyTypedText + TYPING_CURSOR;
        } else {
          childTextNode.nodeValue = this._alreadyTypedText + UNBREAKABLE_SPACE;
        }
      })
    );

    const secondPartTypingObservable = this._typeCharacters(
      childTextNode,
      secondPartToTypeCharacterNumber
    );

    concat(
      firstPartTypingObservable,
      typingCursorBlinkingObservable,
      secondPartTypingObservable
    ).subscribe();
  }

  /**
   * @param childTextNode - text node from the DOM
   * @param numberOfCharacters - number of characters to type
   * @returns an observable emitting sequential numbers every specified interval of time
   */
  private _typeCharacters(
    childTextNode: Node,
    numberOfCharacters: number
  ): Observable<number> {
    return interval(TYPING_INTERVAL).pipe(
      take(numberOfCharacters),
      tap((emittedNumber) => {
        const letterToType = this._charactersToType.shift();
        this._alreadyTypedText += letterToType;
        if (emittedNumber === numberOfCharacters - 1) {
          childTextNode.nodeValue = this._alreadyTypedText + UNBREAKABLE_SPACE;
        } else {
          childTextNode.nodeValue = this._alreadyTypedText + TYPING_CURSOR;
        }
      })
    );
  }
}
