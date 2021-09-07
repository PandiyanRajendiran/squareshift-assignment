import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overfloe: 'auto'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formContainer: {
    padding: theme.spacing(2),
    display: 'flex'
  },
  formLabel: {
    width: '50%'
  }
}));

const Compartment = ({ classes, grid, index, onRemove }) => {
  const onChange = (key, value) => {
    grid[key] = value;
  }

  return (
    <div>
      <label>{'Compartment ' + (index + 1)}</label>
      <div className={classes.formContainer}>
        <TextField
          id="standard-number"
          label="Columns"
          type="number"
          defaultValue={grid.columns}
          onChange={(e) => onChange('columns', e.target.value)}
        />
      </div>
      <div className={classes.formContainer}>
        <TextField
          id="standard-number"
          label="Rows"
          type="number"
          defaultValue={grid.rows}
          onChange={(e) => onChange('rows', e.target.value)}
        />
      </div>
      <Button
        onClick={() => onRemove(index)}
        style={{ margin: '10px' }}
        variant="contained"
        color="secondary" >
        Remove
      </Button>
      <Divider />
    </div>
  );
}

export const LeftPanel = ({ compartments, update, addCompartment, remove }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.paper}>Construct your plane seating capcity</div>
        </Grid>
        <Grid item xs={12}>
          {compartments.map((comp, index) => <Compartment key={index} grid={comp} index={index} classes={classes} onRemove={remove} />)}
        </Grid>
        <Grid item xs={12}>
          <Button style={{ margin: '10px' }} variant="outlined" color="primary" onClick={addCompartment}>
            Add new compartment
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button style={{ margin: '10px' }} variant="outlined" color="primary" onClick={update}>
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
