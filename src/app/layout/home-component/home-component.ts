import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonDetail } from '../../shared/interfaces/pokemon.interface';
import { PokeService } from '../../core/services/poke.service';
import { forkJoin } from 'rxjs';
import { createLinkedSignal } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent implements OnInit {
  pokemonDetails: PokemonDetail[] = [];

  constructor(private pokeService: PokeService) { }

  ngOnInit(): void {
    this.pokeService.getPokemons().subscribe({
      next: (response) => {
        const pokemonObservables = response.results.map(pokemon =>
          this.pokeService.getPokemonDetails(pokemon.url),
        );

        forkJoin(pokemonObservables).subscribe({
          next: (details) => {
            details.forEach((pokemon) => {
              console.log(`Habilidades de ${pokemon.name}:`, pokemon.abilities);
            })
            this.pokemonDetails = details;
          },
          error: (err) => {
            console.error('Error al obtener los detalles de los Pokémon:', err);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener los Pokémon:', error);
      }
    });
  }
}

