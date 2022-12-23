import { IMAGES_SIZES } from './../../constants/images-sizes';
import { ActivatedRoute } from '@angular/router';
import { Tv, TvVideo, TvImages, TvCredits } from './../../models/tv';
import { TvShowsService } from './../../services/tv-shows.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TVComponent implements OnInit {
  tvShow: Tv | null = null;
  imagesSizes = IMAGES_SIZES;
  tvVideos: TvVideo[] = [];
  tvShowImages: TvImages | null = null;
  tvShowCredits: TvCredits | null | any = null;
  similarTvShows: Tv[] = [];

  constructor(private route: ActivatedRoute, private tvShowsService: TvShowsService) {}

  ngOnInit(): void {
    this.route.params.pipe().subscribe(({ id }) => {
      this.getTvShow(id);
      this.getTvVideos(id);
      this.getTvImages(id);
      this.getTvCredits(id);
      this.getTvShowSimilar(id);
    });
  }

  getTvShow(id: string) {
    this.tvShowsService.getTvShow(id).subscribe((tvShowData) => {
      this.tvShow = tvShowData;
    });
  }

  getTvVideos(id: string) {
    this.tvShowsService.getTvVideos(id).subscribe((tvVideosData) => {
      this.tvVideos = tvVideosData;
    });
  }

  getTvImages(id: string) {
    this.tvShowsService.getTvShowImages(id).subscribe((tvImagesData) => {
      this.tvShowImages = tvImagesData;
    });
  }

  getTvCredits(id: string) {
    this.tvShowsService.getTvShowCredits(id).subscribe((tvCreditsData) => {
      this.tvShowCredits = tvCreditsData;
    });
  }

  getTvShowSimilar(id: string) {
    this.tvShowsService.getTvShowSimilar(id).subscribe((tvShowSimilarData) => {
      this.similarTvShows = tvShowSimilarData;
    });
  }
}
