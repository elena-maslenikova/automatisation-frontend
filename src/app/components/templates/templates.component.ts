import { Component, OnDestroy, OnInit } from '@angular/core';
import { System } from '@app/models';
import { SystemService } from '@app/services/system.service';
import { FileService } from '@shared/services/file.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, OnDestroy {
  templates: System[];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private systemService: SystemService,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.systemService.getSystems()
        .subscribe(systems => this.templates = systems?.results)
    );
  }

  getReport(id: number) {
    this.subscriptions.add(
      this.systemService.buildReport(id)
        .subscribe((result: Blob) => this.fileService.downloadFile(result))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
