import { take } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Genre } from './../../models/genre';
import { Tv } from './../../models/tv';
import { TvShowsService } from './../../services/tv-shows.service';
import { Component, OnInit } from '@angular/core';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-tvs',
  templateUrl: './tvs.component.html',
  styleUrls: ['./tvs.component.scss']
})
export class TVSComponent implements OnInit {
  tvShows: Tv[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;
  genres: Genre[] = [];

  constructor(private tvShowsService: TvShowsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      console.log(genreId);
      
      if (genreId) {
        this.genreId = genreId;
        this.getTvShowByGenre(genreId, 1);
      } else {
        this.getPagedTvShows(1);
      }
    });
    this.getGenres();
  }

  getPagedTvShows(page: number, searchKeyword?: string) {
    this.tvShowsService.searchTvShows(page, searchKeyword).subscribe((tvShows) => {
      this.tvShows = tvShows;
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;

    this.genreId
      ? this.getTvShowByGenre(this.genreId, pageNumber)
      : this.searchValue
      ? this.getPagedTvShows(pageNumber, this.searchValue)
      : this.getPagedTvShows(pageNumber);
  }

  getTvShowByGenre(genreId: string, page: number) {
    this.tvShowsService.getTvShowByGenre(genreId, page).subscribe((tvShows) => {
      this.tvShows = tvShows;
    });
  }

  searchChanged() {
    this.searchValue ? this.getPagedTvShows(1, this.searchValue) : null;
  }

  getGenres() {
    this.tvShowsService.getTvShowGenres().subscribe((genresData) => {
      this.genres = genresData;
    });
  }

  onChange(event: any) {
    console.log(event.value);
    let tvShowID = event.value.id;
    this.router.navigateByUrl(`/tvshows/genres/${tvShowID}`);
    this.getTvShowByGenre(tvShowID, 1);
  }
}
