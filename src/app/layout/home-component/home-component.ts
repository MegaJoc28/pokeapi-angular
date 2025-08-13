import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../shared/interfaces/pokemon.interface';
import { PokeService } from '../../core/services/poke.service';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private pokeService: PokeService){}

  ngOnInit(): void {
    this.pokeService.getPokemons().subscribe({
      next: (response) => {
        this.pokemons = response.results;
      },
      error: (err) => {
        console.error('Error al obtener los Pokémon:', err);
      }
    });
  }
}

