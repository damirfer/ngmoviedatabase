import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Movie} from '../movie';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }
  movie:Movie=new Movie();
    apiUrl = 'http://www.omdbapi.com/?apikey=48180829&';

    public getMovieByName(title:string){
        let movieinfo
        let data=this.http.get(this.apiUrl+'t='+title)
        data.subscribe((response)=>
            this.bindToMovie(response)
        );
        return (this.movie)
        
    }

    public getMovieById(imdbid:string){
        let data=this.http.get(this.apiUrl+'i='+imdbid)
        data.subscribe((response)=>
            this.bindToMovie(response)
        );
        return (this.movie)
        
    }

    bindToMovie(movieinfo){
        this.movie.Title=movieinfo['Title']
        this.movie.Plot=movieinfo['Plot']
        this.movie.Year=movieinfo['Year']
        this.movie.Runtime=movieinfo['Runtime']
        this.movie.Genre=movieinfo['Genre']
        this.movie.IsArchived=false;
    }
}