import { makeStyles } from '@material-ui/core/styles';
import { groupByRow } from '../../utils/seat-utils';
import { Seat } from '../Seat';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1rem',
  },
  boxRow: {
    display: 'flex',
  }
}));

const SeatRow = ({ rowSeats, classes }) => {
  return (
    <div className={classes.boxRow}>
      {rowSeats.map(seat => <Seat key={seat.index.join('')} seat={seat} />)}
    </div>
  );
}

export const Compartment = ({ boxSeats }) => {
  const classes = useStyles();
  const rowWiseSeats = groupByRow(boxSeats);
  return (
    <div className={classes.root}>
      {rowWiseSeats.map((rowSeats, index) => <SeatRow key={index} rowSeats={rowSeats} classes={classes} />)}
    </div>
  )
}
