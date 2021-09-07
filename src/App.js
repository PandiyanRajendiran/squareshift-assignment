import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { LeftPanel } from './components/LeftPanel';
import './App.css';
import * as utils from './utils/seat-utils';
import { Compartment } from './components/Compartment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#282c34',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
    height: '48px',
    boxSizing: 'border-box',
  },
  leftPanel: {
    backgroundColor: 'wheat',
    minHeight: '100vh',
    border: '0px solid #f5a612',
    borderRightWidth: '2px',
    padding: theme.spacing(2),
    boxSizing: 'border-box',

  },
  rightPanel: {
    height: 'calc(100vh - 48px)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxSizing: 'border-box',
    overflow: 'auto',
  },
  compartmentContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  passangerCountContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem',
    alignItems: 'center'
  }
}));

export default function App() {
  const classes = useStyles();
  const [compartments, updateCompartments] = useState([{ rows: 2, columns: 2 }]);
  const [passengers, setPassengers] = useState(0);
  const [seats, setSeats] = useState([]);
  const passengerInput = React.createRef();

  const addNewCompartment = () => {
    updateCompartments([...compartments, { rows: 2, columns: 2 }]);
  }

  const updateCompartmentsHandler = () => {
    updateCompartments([...compartments]);
  }

  const updatePassengerSeating = () => {
    setPassengers(+passengerInput.current.value);
  }

  const removeCompartment = (index) => {
    if (compartments.length > 1) {
      compartments.splice(index, 1);
      updateCompartments([...compartments]);
    }
  }

  useEffect(() => {
    const seatsPattern = utils.convertInputTo2Darray(compartments);
    const headNode = utils.contructNodes(seatsPattern, seatsPattern.length - 1, 0, 0, 0, seatsPattern[0][1] - 1, seatsPattern[0][0] - 1);
    if (passengers > 0) {
      utils.fillSeats(headNode, passengers);
    }
    const seats = utils.getNodesByBox(headNode);
    setSeats(seats);
  }, [passengers, compartments]);


  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.header}>SS airplane seating</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.leftPanel}>
            <LeftPanel
              compartments={compartments}
              addCompartment={addNewCompartment}
              update={updateCompartmentsHandler}
              remove={removeCompartment}
            />
          </Paper>
        </Grid>
        <Grid container item xs={9} spacing={3}>
          <Grid item xs={12}>
            <div className={classes.passangerCountContainer}>
              <input style={{height: '32px', margin: '10px'}} ref={passengerInput} placeholder="Enter seats to fill"></input>
              <button style={{height: '32px'}} onClick={updatePassengerSeating}>Fill</button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.rightPanel}>
              <div className={classes.compartmentContainer}>
                {seats.map((boxNodes, index) => <Compartment key={index} boxSeats={boxNodes} />)}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
