import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-skill",
  standalone: true,
  styleUrl: "./skill.component.scss",
  templateUrl: "./skill.component.html",
})
export class SkillComponent {
  /**
   * Expected CSS "background-color" syntax
   * @example #ff0064
   * @example red
   * @example rgba(255, 0, 100, 0.3)
   */
  @Input() public progressBarColor!: string;

  /**
   * Skill progress value, expressed in percent.
   * It should be a number between 0 and 100.
   */
  @Input() public progressValue!: number;

  /**
   * - The "fileName" attribute represents the SVG file name without the ".svg" extension.
   * The SVG file must be located in the folder "images" of the app assets.
   * An "id" attribute with a value matching the SVG file name (without the ".svg" extension)
   * must be put on the HTML "symbol" tag in the SVG file.
   * - The "title" attribute represents the title to be read by screen readers for accessibility.
   * The title is not displayed on the user screen.
   */
  @Input() public svgIcon!: { fileName: string; title: string };
}
