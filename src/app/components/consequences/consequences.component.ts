import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consequence } from '@app/models';
import { ConsequencesSelectors, GetConsequences, UpdateSelectedConsequences } from '@app/store/consequences';
import { Select, Store } from '@ngxs/store';
import { merge, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-consequences',
  templateUrl: './consequences.component.html',
  styleUrls: ['./consequences.component.scss']
})
export class ConsequencesComponent implements OnInit, OnDestroy {
  @Select(ConsequencesSelectors.consequenceList) consequenceList$: Observable<Consequence[]>;
  @Select(ConsequencesSelectors.ispdnConsequencesIds) ispdnConsequencesIds$: Observable<Consequence[]>;
  @Select(ConsequencesSelectors.gisConsequencesIds) gisConsequencesIds$: Observable<Consequence[]>;
  @Select(ConsequencesSelectors.asutpConsequencesIds) asutpConsequencesIds$: Observable<Consequence[]>;
  @Select(ConsequencesSelectors.kiiConsequencesIds) kiiConsequencesIds$: Observable<Consequence[]>;
  @Select(ConsequencesSelectors.selectedConsequencesIds) selectedConsequencesIds$: Observable<number[]>;

  selectedConsequences: number[];
  public displayedColumns: string[] = [
    'select',
    'fullName',
    'description',
  ];

  private subsciptions: Subscription = new Subscription();

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetConsequences());
    this.subsciptions.add(
      merge(
        this.consequenceList$,
        this.ispdnConsequencesIds$,
        this.gisConsequencesIds$,
        this.asutpConsequencesIds$,
        this.kiiConsequencesIds$
      ).subscribe(() => {
        const consequenceList = this.store.selectSnapshot(ConsequencesSelectors.consequenceList);
        const ispdnConsequencesIds = this.store.selectSnapshot(ConsequencesSelectors.ispdnConsequencesIds);
        const gisConsequencesIds = this.store.selectSnapshot(ConsequencesSelectors.gisConsequencesIds);
        const asutpConsequencesIds = this.store.selectSnapshot(ConsequencesSelectors.asutpConsequencesIds);
        const kiiConsequencesIds = this.store.selectSnapshot(ConsequencesSelectors.kiiConsequencesIds);

        const selectedConsequences = consequenceList?.filter(item => ispdnConsequencesIds?.includes(item.id) ||
          gisConsequencesIds?.includes(item.id) || asutpConsequencesIds?.includes(item.id)
          || kiiConsequencesIds?.includes(item.id));
        this.store.dispatch(new UpdateSelectedConsequences(selectedConsequences.map(item => item.id)));
      })
    );

    this.subsciptions.add(
      this.selectedConsequencesIds$.subscribe((consequences) => {
        if (!consequences) { return; }
        this.selectedConsequences = consequences;
      })
    )
  }

  isSelected(id: number): boolean {
    return !!this.selectedConsequences?.find(item => item === id);
  }

  toggle(consequence: Consequence): void {
    const index = this.selectedConsequences.findIndex(item => item === consequence.id);
    if (index !== -1) {
      this.selectedConsequences.splice(index, 1);
    } else {
      this.selectedConsequences.push(consequence.id);
    }

    this.store.dispatch(new UpdateSelectedConsequences(this.selectedConsequences));
  }

  ngOnDestroy(): void {
    this.subsciptions.unsubscribe();
  }

}
