
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export const FormInput = ({label}) => {
  const classes = useStyles();

  return (<TextField
    required
    id="filled-required"
    label="Required"
    defaultValue="Hello World"
    variant="filled"
  />);
}