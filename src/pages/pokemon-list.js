import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Pokeball from '@/assets/pokeball.png'
import Header from '@/components/Header.jsx'
import { getMyPokemon } from '@/api/deck'


class PokemonList extends Component {
	constructor(props) {
    super(props);
    this.state = {
      pokeList: [],
    };
    this.start = 0
    this.count = 0
    this.debounce = null
    this.progress = false
  }

  componentDidMount(){
    this.getPokeList(0, 12, false)
    this.scroll()
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.scroll());
  }

  getPokeList(offset, limit, more){
    fetch("https://pokeapi.co/api/v2/pokemon?offset="+offset+"&limit="+limit,{
      "method": "GET"
    })
    .then(response => response.json())
    .then(response => {
      this.progress = false
      if (response.count > 0) {
        if (more) {
          let arr = response.results;
          let old_arr = this.state.pokeList;
          var newarr = old_arr.concat(arr);
          this.setState({
            pokeList : newarr
          })
        } else {
          this.setState({
            pokeList : response.results
          })
        }
        this.count = response.count
        this.start = this.start + limit;
      }
      
    })
    .catch(err => {
      console.log(err);
    });
  }

  owning(id){
    let pokeList = getMyPokemon()
    if(pokeList == null){
      return 0;
    }else{
      let obj = pokeList.find(x => x.id === parseInt(id));
      return obj === undefined ? 0 : obj.myPokemon.length;
    }
  }

  scroll(){
    let vm = this;
    window.onscroll = () => {
      let el = document.querySelector('#bottomPage')
      if (el != null && vm.isElementInViewport(el) && vm.count > vm.start ) {
        clearTimeout(vm.debounce)
        this.progress = true
        vm.debounce = setTimeout(() => {
          vm.getPokeList(vm.start, 12, true);
      }, 500)
        
      }
    }
  }

  isElementInViewport (el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  render(){
    return (
      <Container maxWidth="xs" className="p-0">
        <Header title="My Pokemon Apps" back={false}/>
        <div className="content">
          <GridList>
            {this.state.pokeList.map((val) => (
              <GridListTile key={val.url.slice(0, -1).split('/').pop()}>
                <Link to={'/detail/'+val.url.slice(0, -1).split('/').pop()+'/'+val.name.split(' ').join('-').toLowerCase()}>
                  <LazyLoadImage
                    className="full-img"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+val.url.slice(0, -1).split('/').pop()+'.png'}
                    placeholderSrc={Pokeball}
                    alt={val.name} 
                    width="100%"
                    height="100%"
                  />
                  <GridListTileBar
                    title={val.name}
                    subtitle={<span>Owned: {this.owning(val.url.slice(0, -1).split('/').pop())}</span>}
                  />
                </Link>
              </GridListTile>
            ))}
          </GridList>
          <Grid container justify="center" className="progress" display={this.progress ? 'flex' : 'none'}>
            <CircularProgress color="secondary"/>
          </Grid>
          <div id="bottomPage" />
        </div>
        <Grid item className="wrapper-button-bottom">
          <Link to="/my-pokemon">
            <Button fullWidth>My Pokemon</Button>
          </Link>
        </Grid>
      </Container>
    );
  }
}

export default PokemonList;