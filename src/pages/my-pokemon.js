import React, { Component } from "react"
import { 
Container,
GridList,
GridListTile,
GridListTileBar,
IconButton
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Pokeball from '@/assets/pokeball.png'
import Header from '@/components/Header.jsx'
import { getMyPokemon, releaseMyPokemon } from '@/api/deck'


class MyPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeList: null,
    };
  }

  componentDidMount() {
    this.setState({pokeList: getMyPokemon()})
  }

  releasePokemon(id, id_cp) {
    let release = releaseMyPokemon({
      id:id,
      id_cp:id_cp
    })

    this.setState({pokeList: release})
  }

  render(){
    return (
      <Container maxWidth="xs" className="p-0">
        <Header title="My Pokemon List" back={true}/>
        <div className="content">
          {this.state.pokeList == null ? 
            <h3>You dont have a pokemon, please catch a pokemon</h3> : 
            <div>
              {this.state.pokeList.map((val) => (
                <React.Fragment key={val.id}>
                  <p>{val.name}</p>
                  <GridList>
                    {val.myPokemon.map((v) => (
                      <GridListTile key={v.id}>
                        <LazyLoadImage
                          className="full-img"
                          src={val.img.front_default}
                          placeholderSrc={Pokeball}
                          alt={val.name} 
                          width="100%"
                          height="100%"
                        />
                        <GridListTileBar
                          title={v.nickname}
                          actionIcon={
                            <IconButton color="secondary" className="icon" onClick={() => this.releasePokemon(val.id, v.id)}>
                              <DeleteIcon />
                            </IconButton>
                          }
                        />
                      </GridListTile>
                    ))}
                  </GridList>
                </React.Fragment>
              ))}
            </div>
          }
        </div>
      </Container>
    );
  }
}

export default MyPokemon;