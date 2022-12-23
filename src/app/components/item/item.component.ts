import { Tv } from './../../models/tv';
import { IMAGES_SIZES } from './../../constants/images-sizes';
import { environment } from './../../../environments/environment';
import { Movie } from './../../models/movie';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData: Movie | null = null;
  @Input() tvData: Tv | null = null;
  imagesSizes = IMAGES_SIZES;

  constructor() { }

  ngOnInit(): void {
  }

}
