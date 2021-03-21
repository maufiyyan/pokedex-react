import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom'
import PokemonList from '@/pages/pokemon-list'
import MyPokemon from '@/pages/my-pokemon'
import Detail from '@/pages/details'

class Link extends Component {
  render(){
    return (
   		<Switch>
			<Route exact path="/" component={PokemonList} />
			<Route path="/my-pokemon" component={MyPokemon} />
			<Route path="/detail/:id/:name" component={Detail} />
		</Switch>
    );
  }
}

export default Link;