import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from "@angular/core";

import { ProjectComponent } from "./components/project/project.component";
import { SkillComponent } from "./components/skill/skill.component";
import { TextTypingDirective } from "./directives/text-typing.directive";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ProjectComponent,
    SkillComponent,
    TextTypingDirective,
  ],
  selector: "app-root",
  standalone: true,
  styleUrl: "./app.component.scss",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  public isHeaderTransparent = true;

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (window.scrollY <= window.innerHeight / 10) {
      this.isHeaderTransparent = true;
    } else {
      this.isHeaderTransparent = false;
    }
  }
}
