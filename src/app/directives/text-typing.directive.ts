import { AfterViewInit, Directive, ElementRef, Input } from "@angular/core";
import { concat, interval, Observable, take, tap } from "rxjs";

const UNBREAKABLE_SPACE = "\u00a0";

@Directive({
  selector: "[appTextTyping]",
  standalone: true,
})
export class TextTypingDirective implements AfterViewInit {
  private _alreadyTypedText = "";
  private _charactersToType!: string[];
  private readonly _typingCursorBlinks = 2;
  private readonly _typingCursorBlinkingInterval = 500; // expressed in milliseconds
  private readonly _typingInterval = 50; // expressed in milliseconds
  private readonly _typingCursor = "|";

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
      this._typingCursorBlinkingInterval
    ).pipe(
      take(this._typingCursorBlinks * 2),
      tap((emittedNumber) => {
        if (emittedNumber % 2 === 0) {
          childTextNode.nodeValue = this._alreadyTypedText + this._typingCursor;
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
    return interval(this._typingInterval).pipe(
      take(numberOfCharacters),
      tap((emittedNumber) => {
        const letterToType = this._charactersToType.shift();
        this._alreadyTypedText += letterToType;
        if (emittedNumber === numberOfCharacters - 1) {
          childTextNode.nodeValue = this._alreadyTypedText + UNBREAKABLE_SPACE;
        } else {
          childTextNode.nodeValue = this._alreadyTypedText + this._typingCursor;
        }
      })
    );
  }
}
