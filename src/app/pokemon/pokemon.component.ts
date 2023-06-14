import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Pokemon {
  name: string;
  url: string;
}

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selectedPokemon: string = '';
  pokemonImageUrl: string | undefined;
  isShiny: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=151').subscribe(response => {
      this.pokemons = response.results;
    });
  }


  onChangePokemon() {
    const selectedPokemon = this.pokemons.find(pokemon => pokemon.name === this.selectedPokemon);
    if (selectedPokemon) {
      const pokemonIndex = this.pokemons.indexOf(selectedPokemon) + 1;
      console.log(pokemonIndex);
      
      this.pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemonIndex}.png`;
      
    }
  }
}