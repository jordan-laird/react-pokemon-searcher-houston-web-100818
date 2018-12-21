import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor(){
    super()
    this.state = {
      pokemon: [],
    }
  }

  fetchPokemon = () => {
    return fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    
  }

  search = _.debounce((searchTerm) => this.searchPoke(searchTerm), 500)

  searchPoke = (searchTerm) => {
    console.log(searchTerm)
    this.fetchPokemon()
    .then( (pokemon) => {
      let filtered = pokemon.filter(pokemon => pokemon.name.includes(searchTerm))
      this.setState({pokemon: filtered})
    })
  }

  addPoke = (newPoke) => {
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newPoke.name,
        stats:[{
          name: 'hp',
          value: parseInt(newPoke.hp)
        }],
        sprites:{
          front: newPoke.frontUrl,
          back: newPoke.backUrl
        }
      })
    })
    this.fetchPokemon()
  }

  componentDidMount(){
    this.fetchPokemon()
      .then((pokemon) => {
        this.setState({ pokemon: pokemon })
      })
  }
  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={e => this.search(e.target.value)} showNoResults={false} />
        <br />
        <PokemonForm addPoke={this.addPoke} />
        <br />
        <PokemonCollection pokemon={this.state.pokemon} />
      </div>
    )
  }
}

export default PokemonPage
