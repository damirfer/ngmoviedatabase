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
  movies:Movie[]=[];
  archived:Movie[]=[];
  searchValue: string;
  searchoption="name";
  showResult=false;
  constructor(private searchService:SearchService) { }

  ngOnInit() {
    this.searchService.getMustWatch().subscribe(
      res=>{
          this.movies=res
      })

    this.searchService.getArchived().subscribe(
      res=>{
        this.archived=res
      }
    )

    
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
      if(movie.ImdbId===this.movie.ImdbId)
        return;
    }
    let newMovie=Object.assign({}, this.movie);
    this.movies.push(newMovie);
    this.searchService.addToMustWatch(newMovie);
  }
  addToArchive(movie:Movie){
    this.searchService.setArchived(movie.ImdbId);
    this.movies.splice(this.movies.indexOf(movie),1);
    this.archived.push(movie);
  }

  setMustWatch(movie:Movie){
    this.searchService.setMustWatch(movie.ImdbId);
    this.archived.splice(this.archived.indexOf(movie),1);
    this.movies.push(movie);
  }
  deleteMovie(movie:Movie){
    this.searchService.delete(movie.ImdbId);
    this.archived.splice(this.movies.indexOf(movie),1);
  }


}
