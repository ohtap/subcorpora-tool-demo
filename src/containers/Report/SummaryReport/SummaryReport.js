import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Animation } from '@devexpress/dx-react-chart';
import {
  Chart,
  LineSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Legend
} from '@devexpress/dx-react-chart-material-ui';

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendLabelStyles = theme => ({
  label: {
    paddingTop: theme.spacing.unit,
    whiteSpace: 'nowrap',
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column',
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);

const ValueLabel = (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text}%`}
    />
  );
};

const titleStyles = {
  title: {
    whiteSpace: 'pre',
  },
};

const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));

const styles = theme => ({
	root: {

	},
	chart: {
    paddingRight: '20px',
  },
  title: {
    whiteSpace: 'pre',
  },
	paper: {
		...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
	},
});

const format = () => tick => tick;

class SummaryReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
			data: this.props.parentData, // Passed from the parent report
			timeRangeInterviewsData: [],
			timeRangeBirthYearData: [],
	  };
  }

  componentDidMount() {
  	this.generateTimeRangeInterviewsData();
  	this.generateTimeRangeBirthYear();
  }

  generateTimeRangeInterviewsData = () => {
		// TODO: Sort them by the key
		const newData = [];
		const data = this.state.data['summary-report']['time-range-interviews'];
		for (var key in data) {
			const value = data[key];
			newData.push({lineValue: value, argument: parseInt(key)});
		}

		this.setState({ timeRangeInterviewsData: newData });
	};

	generateTimeRangeBirthYear = () => {
		// TODO: Sort them by the key
		const newData = [];
		const data = this.state.data['summary-report']['time-range-birth-year'];
		for (var key in data) {
			const value = data[key];
			newData.push({lineValue: value, argument: parseInt(key)});
		}

		this.setState({ timeRangeBirthYearData: newData });
	};

  render() {
  	const { classes } = this.props;
    const { timeRangeInterviewsData: triData, timeRangeBirthYearData: trbyData } = this.state;
    const summaryData = this.state.data['summary-report'];

    return (
    	<div className={classes.root}>
    		<Paper className={classes.paper} elevation={1}>
	        <Typography variant="h5" component="h3">
	          Basic Information
	        </Typography>
	        <Typography component="p">
	          <b>Total collections: </b>{ summaryData['total-collections'] }<br />
	          <b>&#x00025; collections with keywords: </b>{ (summaryData['total-collections-with-keywords'] / summaryData['total-collections']) * 100 } &#x00025;<br />
	          <b>Total interviews: </b>{ summaryData['total-interviews'] }<br />
	          <b>&#x00025; interviews with keywords: </b>{ (summaryData['total-interviews-with-keywords'] / summaryData['total-interviews']) * 100 } &#x00025;<br />
	          <b>Total keywords: </b>{ summaryData['total-keywords'] }<br />
	          <b>Total keywords found: </b>{ summaryData['total-keywords-found'] }<br />
	        </Typography>
	      </Paper>
	      <br />
	      <Paper>
	        <Chart
	          data={triData}
	          className={classes.chart}
	        >
	          <ArgumentAxis tickFormat={format} />
	          <ValueAxis
	            max={50}
	            labelComponent={ValueLabel}
	          />

	          <LineSeries
	            valueField="lineValue"
	            argumentField="argument"
	            name="All Collections"
	          />
	          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
	          <Title
	            text={`Time range of years interviews were conducted ${'\n'}(Across all collections)`}
	            textComponent={TitleText}
	          />
	          <Animation />
	        </Chart>
	      </Paper>
	      <Paper>
	        <Chart
	          data={trbyData}
	          className={classes.chart}
	        >
	          <ArgumentAxis tickFormat={format} />
	          <ValueAxis
	            max={50}
	            labelComponent={ValueLabel}
	          />

	          <LineSeries
	            valueField="lineValue"
	            argumentField="argument"
	            name="All Collections"
	          />
	          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
	          <Title
	            text={`Time range of years interviees were born ${'\n'}(Across all collections)`}
	            textComponent={TitleText}
	          />
	          <Animation />
	        </Chart>
	      </Paper>
      </div>
    );
  }
}

SummaryReport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SummaryReport);
