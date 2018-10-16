import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Movie} from '../movie';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable({
    providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }
  movie:Movie=new Movie();
  movies;
    apiUrl = 'http://www.omdbapi.com/?apikey=48180829&';
    localUrl='http://localhost:56303/api/movie/'

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

    public addToMustWatch(newMovie){
        this.http.post(this.localUrl,newMovie,httpOptions).subscribe(
            data=>{
                console.log("Post request is successful",data);
            },
            error=>{
                console.log("Error",error);
            }
        )
    }

    public getMustWatch(){
        return this.http.get<any[]>(this.localUrl+"getmustwatch");

    }
    public getArchived(){
        return this.http.get<any[]>(this.localUrl+"getarchived");
    }

    public setArchived(imdbId:string){
        return this.http.put<void>(this.localUrl+"setArchived/"+imdbId,httpOptions).subscribe(
            data=>{
                console.log("Put request is successful",data);
            },
            error=>{
                console.log("Error",error);
            }
        );
    }

    public setMustWatch(imdbId:string){
        return this.http.put<void>(this.localUrl+"setMustWatch/"+imdbId,httpOptions).subscribe(
            data=>{
                console.log("Put request is successful",data);
            },
            error=>{
                console.log("Error",error);
            }
        )
    }
    public delete(imdbId:string){     
        return this.http.delete<void>(this.localUrl+"delete/"+imdbId).subscribe(
            data=>{
                console.log("delete request is successful",data);
            },
            error=>{
                console.log("Error",error);
            }
        );
    }

    bindToMovie(movieinfo){
        this.movie.Title=movieinfo['Title']
        this.movie.Plot=movieinfo['Plot']
        this.movie.Year=movieinfo['Year']
        this.movie.Runtime=movieinfo['Runtime']
        this.movie.Genre=movieinfo['Genre']
        this.movie.IsArchived=false;
        this.movie.ImdbId=movieinfo['imdbID'];
    }
}