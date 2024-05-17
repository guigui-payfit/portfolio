import { ChangeDetectionStrategy, Component } from "@angular/core";

import { SkillComponent } from "./components/skill/skill.component";
import { TextTypingDirective } from "./directives/text-typing.directive";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkillComponent, TextTypingDirective],
  selector: "app-root",
  standalone: true,
  styleUrl: "./app.component.scss",
  templateUrl: "./app.component.html",
})
export class AppComponent {}
