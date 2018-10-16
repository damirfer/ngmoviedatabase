import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search/search.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movie: Movie=new Movie();
  movies:Movie[]=[
    {"Title":"test","Plot":"test","Year":"test","Genre":"test","Runtime":"test","IsArchived":false}
  ];
  searchValue: string;
  searchoption="name";
  showResult=false;
  constructor(private searchService:SearchService) { }

  ngOnInit() {
  }

  getMovieByName(title:string):void{
    this.movie=this.searchService.getMovieByName(title)
  }


  getMovieById(imdbid:string):void{
    this.movie=this.searchService.getMovieById(imdbid)

  }

  searchMovie(event: Event){
    if(this.searchoption=="name"){
      this.getMovieByName(this.searchValue)
    }else{
      this.getMovieById(this.searchValue)
    }
    this.showResult=true;
  }

  addToMustWatch(){
    for(let movie of this.movies){
      if(movie.Title===this.movie.Title)
        return;
    }
    this.movies.push(this.movie);
  }
}
