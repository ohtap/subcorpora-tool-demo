import React from 'react';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';

const birth_year_data = [
  { year: '1890', num: 6 },
  { year: '1900', num: 2 },
  { year: '1910', num: 1}
];

const education_data = [
  { education: 'High School Graduate', num: 3 },
  { education: 'Bachelor\'s Degree', num: 2 },
  { education: 'Graduate or Professional Degree', num: 3 },
  { education: 'Associate\'s Degree', num: 1 },
];

const sex_data = [
  { sex: 'Female', num: 9 }
];

const birth_country_data = [
  { country: 'Not Given', num: 9 }
];

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Past_Runs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      birth_year_data,
      education_data,
      sex_data,
      birth_country_data,
      styles,
    };
  }

  render() {
    const { 
      birth_year_data: birthYearChartData,
      education_data: educationCountsChartData,
      sex_data: sexCountsChartData,
      birth_country_data: birthCountryChartData,
      styles: styles,
    } = this.state;
    return (
      <div>
        <Typography variant='h4'>
          BWOH_sex Report
        </Typography>
        <br />

        <Typography variant='h6'>
          Collection Information
        </Typography>
        <Typography paragraph>
          <b>Collection name:</b> BWOH <br />
          <b>Total number of files:</b> 11
        </Typography>
        <br />

        <Typography variant='h6'>
          Keyword Information
        </Typography>
        <Typography paragraph>
          <b>Keyword list name:</b> sex <br />
          <b>Keyword version:</b> 1 <br />
          <b>Keywords included:</b> sex, sexual, sexuality <br />
          <b>Keywords excluded:</b>
        </Typography>
        <br />

        <Typography variant='h6'>
          Metadata Statistics
        </Typography>
        <Typography paragraph>
          <b>Total number of interviews included:</b> 9 <br />
          <b>Total number of interviews:</b> 11 <br />
          <b>Total number of interviews with no transcript:</b> 0 <br />
          <b>Total number of interviews with only male interviewees:</b> 0 <br />
          <b>Total number of interviews with both male and non-male interviewees:</b> 0 <br />
          <b>Total unique interviewees:</b> 9
        </Typography>
        <Paper>
          <Chart data={birthYearChartData}>
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries valueField='num' argumentField="year" />
            <Title text="Birth Decade of Interviewees" />
            <Animation />
          </Chart>
        </Paper>
        <Paper>
          <Chart data={educationCountsChartData}>
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries valueField='num' argumentField="education" />
            <Title text="Education of Interviewees" />
            <Animation />
          </Chart>
        </Paper>
        <Paper>
          <Chart data={sexCountsChartData}>
            <ArgumentAxis />
            <ValueAxis />

            <PieSeries valueField='num' argumentField='sex' />
            <Title text='Sex of Interviewees' />
            <Animation />
          </Chart>
        </Paper>
        <Paper>
          <Chart data={birthCountryChartData}>
            <ArgumentAxis />
            <ValueAxis />

            <PieSeries valueField='num' argumentField='country' />
            <Title text='Birth Country of Interviewees' />
            <Animation />
          </Chart>
        </Paper>
        <br />

        <Typography variant='h6'>
          Keyword Statistics
        </Typography>
        <Typography paragraph>
          <b>Subcorpora written into directory:</b> BWOH_sex_20194302358 <br />
          <b>Multiple keyword counts written into file:</b> ./data/results/BWOH_sex_20194302358_multiple_keywords.csv <br />
          <b>Keyword counts written into file:</b> ./data/results/BWOH_sex_20194302358_keyword_counts.csv <br />
          <b>Total number of files at least one keyword:</b> 3 <br />
          <b>Total number of keywords found:</b> 3 <br />
          <b>Percentage of files:</b> 27.272999999999996%
        </Typography>
        <br />

        <Typography variant='h6'>
          Contexts
        </Typography>
        <Typography paragraph>BWOH_Abbott_Jessie.txt</Typography>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Is False Hit?</TableCell>
              <TableCell>Context</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell><Checkbox /></TableCell>
            <TableCell>...was a factor in where you had to stay and what you had to do. As you look back on it now, do you think that things might have been different, or you might have been more effective had you been of a different race or a different <b>sex</b>? JA: I am sure it could have been. I traveled with the teams, so of course, "we ran Into a lot of segregation. We would have to travel all day and all night, because we couldn't find a place to stay. We couldn't eat in any of the restaurants, unless...</TableCell>
          </TableBody>
        </Table>
        <br />
        
        <Typography paragraph>BWOH_Adams_Frankie.txt</Typography>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Is False Hit?</TableCell>
              <TableCell>Context</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell><Checkbox /></TableCell>
            <TableCell>...things for each other than they can do in separate things. But it doesn't hold that you're going to be really on the know and on the inside workings of organizational efforts, particularly so for the colored. My concern for various combinations of groups, based on race or <b>sex</b>, is probably best illustrated by a rather recent happening. An organization of black social workers asked me to permit it to set up a scholarship in my name, i.e., the Frankie V. Adams Scholarship Fund. I told the person contacting me I could not afford to accept it, for all...</TableCell>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Past_Runs;