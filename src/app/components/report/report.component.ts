import { Component, OnDestroy } from '@angular/core';
import { System, SystemRequest } from '@app/models';
import { SystemService } from '@app/services/system.service';
import { AssetsSelectors } from '@app/store/assets';
import { ClassesSelectors } from '@app/store/classes';
import { ConsequencesSelectors } from '@app/store/consequences';
import { Store } from '@ngxs/store';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnDestroy {
  isName: string;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private systemService: SystemService
  ) { }

  buildReport() {
    const params: SystemRequest = {
      name: this.isName,
      assets: this.store.selectSnapshot(AssetsSelectors.selectedAssetsIds),
      // assets: [1, 2, 3],
      negative_consequences: this.store.selectSnapshot(ConsequencesSelectors.selectedConsequencesIds)
    };
    const ispdn_classes = this.store.selectSnapshot(ClassesSelectors.ispdnClasses);
    ispdn_classes ? params.ispdn_classes = ispdn_classes : null;
    const gis_classes = this.store.selectSnapshot(ClassesSelectors.ispdnClasses);
    gis_classes ? params.gis_classes = gis_classes : null;
    const asutp_classes = this.store.selectSnapshot(ClassesSelectors.ispdnClasses);
    asutp_classes ? params.asutp_classes = asutp_classes : null;
    const kii_classes = this.store.selectSnapshot(ClassesSelectors.ispdnClasses);
    kii_classes ? params.kii_classes = kii_classes : null;

    this.subscriptions.add(
      this.systemService.createSystem(params).pipe(
        switchMap((system: System) => {
          return this.systemService.buildReport(system.id);
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
