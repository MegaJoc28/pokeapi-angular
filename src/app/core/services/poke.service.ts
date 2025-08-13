import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonDetail, PokemonResponse } from '../../shared/interfaces/pokemon.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(this.apiUrl);
  }

  getPokemonDetails(url: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(url);
  }
}  
