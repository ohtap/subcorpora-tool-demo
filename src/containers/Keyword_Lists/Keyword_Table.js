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
function createData(name, version, date_added, included, excluded) {
  id += 1;
  return { id, name, version, date_added, included, excluded };
}

const rows = [
  createData('sex', 1, '01/01/2019', 'sex, sexuality, sexual', ''),
];

function Keyword_Table(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell align="right">Version</CustomTableCell>
            <CustomTableCell align="right">Date added</CustomTableCell>
            <CustomTableCell align="right">Included keywords</CustomTableCell>
            <CustomTableCell align="right">Excluded keywords</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell align="right">{row.version}</CustomTableCell>
              <CustomTableCell align="right">{row.date_added}</CustomTableCell>
              <CustomTableCell align="right">{row.included}</CustomTableCell>
              <CustomTableCell align="right">{row.excluded}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

Keyword_Table.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Keyword_Table);