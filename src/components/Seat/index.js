import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import classnames from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  seat: {
    height: '1.5rem',
    width: '1rem',
    padding: '1rem',
    margin: '.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid transparent',
    transition: 'all 0.6s linear',
    transitionDelay: '0s'
  },
  window: {
    backgroundColor: 'yellowgreen',
  },
  aisle: {
    backgroundColor: '#2da9de',
  },
  middle: {
    backgroundColor: '#eb224c',
  }
}));

export const Seat = ({seat}) => {
  const classes = useStyles();

  return (<Paper
    style={{ transitionDelay: `${seat.position * 100}ms` }}
    className={classnames(classes.seat, classes[seat.type])}>
    {seat.position ? seat.position : '-'}
  </Paper>);
}