import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-project",
  standalone: true,
  styleUrl: "./project.component.scss",
  templateUrl: "./project.component.html",
})
export class ProjectComponent {
  @Input() public image!: string;
  @Input() public sourceCodeLink!: string;
  @Input() public title!: string;
  @Input() public websiteLink?: string;
}
