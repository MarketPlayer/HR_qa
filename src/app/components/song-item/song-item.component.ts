import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

import { Song } from '../../interfaces/common';

import * as d3 from 'd3';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss']
})
export class SongItemComponent implements AfterViewInit, Song {
  @Output('onremove') onremove = new EventEmitter<number>();

  @Input('id') id: number;
  @Input('name') name: string;

  d3SvgContainer: any;
  d3SvgSongGroup: any;
  firstClickPositionX: number;
  originPositionX = 0;
  originWidth = 50;

  private initSvgContainer(): void {
    this.d3SvgContainer = d3
      .select('#track' + this.id)
      .attr('width', '100%')
      .attr('height', '100%');
  }

  private initSvgGroup(): void {
    this.d3SvgSongGroup = this.d3SvgContainer
      .append('svg:g')
      .attr('class', 'song-item-group')
      .attr('fill', 'purple')
      .call(
        d3
          .drag()
          .on('start', () => {
            this.firstClickPositionX = d3.event.x;
          })
          .on('drag', () => {
            let diffDistanceX = d3.event.x - this.firstClickPositionX;

            this.d3SvgContainerSelectors.SONG_ITEM_GROUP.attr(
              'transform',
              `translate(${diffDistanceX})`
            );
          })
          .on('end', () => {
            let diffDistanceX = d3.event.x - this.firstClickPositionX;
            this.originPositionX = this.originPositionX + diffDistanceX;

            this.updateSvgElementsPosition();
          })
      );
  }

  private initSvgRect(): void {
    let firstClickPositionX,
      originPositionX = 0;

    this.d3SvgSongGroup
      .append('svg:rect')
      .attr('x', `${originPositionX}`)
      .attr('y', '25%')
      .attr('width', `${this.originWidth}`)
      .attr('height', '50%')
      .attr('rx', '10px')
      .attr('ry', '10px')
      .attr('stroke', '#000')
      .attr('fill', `${'#' + ((Math.random() * 0xffffff) << 0).toString(16)}`)
      .attr('cursor', 'pointer');
  }

  private initSvgControls(): void {
    this.d3SvgSongGroup
      .append('svg:rect')
      .attr('class', 'control-left')
      .attr('x', `${0}`)
      .attr('y', '25%')
      .attr('width', '10px')
      .attr('height', '50%')
      .attr('rx', '10px')
      .attr('ry', '10px')
      .attr('fill', 'transparent')
      .attr('cursor', 'col-resize')
      .call(
        d3
          .drag()
          .on('start', () => {
            this.firstClickPositionX = d3.event.x;
          })
          .on('drag', () => {
            let diffDistanceX = d3.event.x - this.firstClickPositionX;
            this.d3SvgContainerSelectors.RECT.attr(
              'width',
              `${this.originWidth - diffDistanceX}`
            ).attr('transform', `translate(${diffDistanceX})`);

            this.d3SvgContainerSelectors.CONTROL_LEFT.attr(
              'transform',
              `translate(${diffDistanceX})`
            );
          })
          .on('end', () => {
            let diffDistanceX = d3.event.x - this.firstClickPositionX;
            this.originWidth = this.originWidth - diffDistanceX;
            this.originPositionX = this.originPositionX + diffDistanceX;

            this.updateSvgElementsPosition();
          })
      );

    this.d3SvgSongGroup
      .append('svg:rect')
      .attr('class', 'control-right')
      .attr('x', `${this.originWidth - 10}`)
      .attr('y', '25%')
      .attr('width', '10px')
      .attr('height', '50%')
      .attr('rx', '10px')
      .attr('ry', '10px')
      .attr('fill', 'transparent')
      .attr('cursor', 'col-resize')
      .call(
        d3
          .drag()
          .on('start', () => {
            this.firstClickPositionX = d3.event.x;
          })
          .on('drag', () => {
            let diffDistanceX = d3.event.x - this.firstClickPositionX;
            this.d3SvgContainerSelectors.RECT.attr('width', `${this.originWidth + diffDistanceX}`);

            this.d3SvgContainerSelectors.CONTROL_RIGHT.attr(
              'transform',
              `translate(${diffDistanceX})`
            );
          })
          .on('end', () => {
            let diffDistanceX = d3.event.x - this.firstClickPositionX;
            this.originWidth = this.originWidth + diffDistanceX;

            this.updateSvgElementsPosition();
          })
      );
  }

  private updateSvgElementsPosition(): void {
    //reset previous transformations
    this.d3SvgContainerSelectors.SONG_ITEM_GROUP.attr('transform', `translate(0)`);
    this.d3SvgContainerSelectors.RECT.attr('transform', `translate(0)`);
    this.d3SvgContainerSelectors.CONTROL_LEFT.attr('transform', `translate(0)`);
    this.d3SvgContainerSelectors.CONTROL_RIGHT.attr('transform', `translate(0)`);

    this.d3SvgContainerSelectors.RECT.attr('x', `${this.originPositionX}`);
    this.d3SvgContainerSelectors.CONTROL_LEFT.attr('x', `${this.originPositionX}`);
    this.d3SvgContainerSelectors.CONTROL_RIGHT.attr(
      'x',
      `${this.originPositionX + this.originWidth - 10}`
    );
  }

  get d3SvgContainerSelectors(): any {
    return {
      SONG_ITEM_GROUP: this.d3SvgContainer.select('.song-item-group'),
      RECT: this.d3SvgContainer.select('rect'),
      CONTROL_LEFT: this.d3SvgContainer.select('.control-left'),
      CONTROL_RIGHT: this.d3SvgContainer.select('.control-right')
    };
  }

  removeTrack(): void {
    this.onremove.emit(this.id);
  }

  constructor() {}

  ngAfterViewInit() {
    this.initSvgContainer();
    this.initSvgGroup();
    this.initSvgRect();
    this.initSvgControls();
  }
}
