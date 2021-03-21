import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

class header extends Component {
  render() {
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        className="header"
      >
        {this.props.back ? 
          <Grid item xs={3}>
            <Link to="/">
              <IconButton aria-label="back" to="/">
                <ArrowBackIcon />
              </IconButton>
            </Link>
          </Grid>
          : ''
        }
        <Grid item xs={this.props.back ? 9 : 12} className={this.props.back ? 'text-left' : 'text-center'}>
          <label>{this.props.title}</label>
        </Grid>
      </Grid>
    )
  }
}
export default header;