import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class detailPokemon extends Component {
  constructor(props) {
    super(props);
    this.pokemon = props.pokemon
  }
  render() {
    
    return (
      <Grid item xs={12} className="ability">
        <Accordion square>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography>Types</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {this.pokemon.types.map((val) => (
                <li key={val.type.url}>{val.type.name}</li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion square>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography>Moves</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {this.pokemon.moves.map((val) => (
                <li key={val.move.url}>{val.move.name}</li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      </Grid>
    )
  }
}
export default detailPokemon;