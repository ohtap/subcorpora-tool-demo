import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(col_id, name, count, description, themes, notes) {
  id += 1;
  return { id, col_id, name, count, description, themes, notes };
}

const rows = [
  createData('SHSA', 'Stanford Historical Society Alumni Interviews', '30', 'Interviews from various alumni projects, including Alumni Stories 2007, Alumni Stories 2008, and Alumni Interviews.', 'Experiences as a Stanford student.', 'This set of interviews is a subset of the Stanford Oral History Program\'s collection.'),
];

function Collections_Table(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>ID</CustomTableCell>
            <CustomTableCell align="right">Name</CustomTableCell>
            <CustomTableCell align="right">Collection count</CustomTableCell>
            <CustomTableCell align="right">Description</CustomTableCell>
            <CustomTableCell align="right">Themes</CustomTableCell>
            <CustomTableCell align="right">Notes</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.col_id}
              </CustomTableCell>
              <CustomTableCell align="left">{row.name}</CustomTableCell>
              <CustomTableCell align="left">{row.count}</CustomTableCell>
              <CustomTableCell align="left">{row.description}</CustomTableCell>
              <CustomTableCell align="left">{row.themes}</CustomTableCell>
              <CustomTableCell align="right">{row.notes}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

Collections_Table.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Collections_Table);