import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TextTypingDirective } from "./directives/text-typing.directive";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextTypingDirective],
  selector: "app-root",
  standalone: true,
  styleUrl: "./app.component.scss",
  templateUrl: "./app.component.html",
})
export class AppComponent {}
