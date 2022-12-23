import { Genre } from './../../models/genre';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;
  genres: Genre[] = [];

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
    this.getGenres();
  }

  getPagedMovies(page: number, searchKeyword?: string) {
    this.moviesService.searchMovies(page, searchKeyword).subscribe((movies) => {
      this.movies = movies;
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;

    this.genreId
      ? this.getMoviesByGenre(this.genreId, pageNumber)
      : this.searchValue
      ? this.getPagedMovies(pageNumber, this.searchValue)
      : this.getPagedMovies(pageNumber);
  }

  searchChanged() {
    this.searchValue ? this.getPagedMovies(1, this.searchValue) : null;
  }

  getGenres() {
    this.moviesService.getMoviesGenres().subscribe((genresData) => {
      this.genres = genresData;
    });
  }

  onChange(event: any) {
    let movieID = event.value.id;
    this.router.navigateByUrl(`/movies/genres/${movieID}`);
    this.getMoviesByGenre(movieID, 1);
  }
}
