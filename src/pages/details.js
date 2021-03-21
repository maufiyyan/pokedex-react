import React, { Component } from "react"
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Pokeball from '@/assets/pokeball.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Header from '@/components/Header.jsx'
import DetailsPokemon from '@/components/details-panel.jsx'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField';
import { storePokemon } from '@/api/deck'

class Details extends Component {
	constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
      modal: false,
      isFail: false,
      nickname: '',
    };
    this.id = props.match.params.id
    this.name = props.match.params.name
    this.nickname = ''
  }

  componentDidMount() {
    this.getPokeDesc(this.id)
  }

  getPokeDesc(id) {
    fetch("https://pokeapi.co/api/v2/pokemon/"+id,{
      "method": "GET"
    })
    .then(response => response.json())
    .then(response => {
      this.setState({ pokemon: response });
    })
    .catch(err => {
      console.log(err);
    });
    
  }

  getPokemon(){
    if (Math.random() >= 0.5){
      this.setState({ isFail: false });
    }else{
      this.setState({ isFail: true });
    }
    this.setState({ modal: true });
  }

  gotchaPokemon() {
    let data = {
      id:this.state.pokemon.id,
      name:this.state.pokemon.name,
      img: this.state.pokemon.sprites,
      myPokemon:[{
        id:parseInt(this.idgenerator()),
        nickname:this.state.nickname
      }]
    }
    storePokemon(data)
    this.setState({ modal: false })
    this.setState({ nickname: '' })
  }

  idgenerator() {
    let length = 8;
    let timestamp = +new Date();

    return this.generate(timestamp,length)
  }

  generate(timestamp,length) {
    var ts = timestamp.toString();
    var parts = ts.split( "" ).reverse();
    var id = "";

    for( var i = 0; i < length; ++i ) {
      var index = this.getRandomInt( 0, parts.length - 1 );
      id += parts[index];  
    }
    return id;
  }

  getRandomInt(min, max) {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }

  closeModal() {
    this.setState({ modal: false });
  }

  handleChangeInput(event) {
    this.setState({nickname: event.target.value});
  }

  render() {

    const formModal = (
      <div className="modal-body">
        <h3>Success You Got a Pokemon</h3>
        <form onSubmit={this.gotchaPokemon}>
          <TextField label="Nickname" value={this.state.nickname} onChange={this.handleChangeInput.bind(this)}/>
          <Button fullWidth onClick={this.gotchaPokemon.bind(this)}>Submit</Button>
        </form>
      </div>
    );

    const failModal = (
      <div className="modal-body">
        <h3>You Fail to Catch a Pokemon</h3>
        <p>You Fail to Catch a Pokemons</p>
      </div>
    );

    return (
      <Container maxWidth="xs" className="p-0">
        <Header title={this.name} back={true}/>
        <div className="content content-details">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={6}>
            {this.state.pokemon == null ?
              '' :
              <LazyLoadImage
                className="full-img"
                src={this.state.pokemon.sprites.front_default}
                placeholderSrc={Pokeball}
                alt={this.state.pokemon.name} 
                width="100%"
              />
            }
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
          >
            {this.state.pokemon == null ?
              '' :
              <DetailsPokemon pokemon={this.state.pokemon} />
            }
          </Grid>
        </div>
        <Grid item className="wrapper-button-bottom">
          <Button fullWidth onClick={this.getPokemon.bind(this)}>Catch</Button>
        </Grid>
        <Modal
          open={this.state.modal}
          onClose={this.closeModal.bind(this)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="modal"
        >
          {!this.state.isFail ? formModal : failModal}
        </Modal>
      </Container>
    );
  }
}

export default Details;