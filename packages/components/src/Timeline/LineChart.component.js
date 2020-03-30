import React, { useMemo } from 'react';
import {
	Area,
	AreaChart,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Text,
} from 'recharts';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import getLocale from '../DateFnsLocale/locale';
import { useTimelineContext } from './context';

const randomPercentage = (min, max) => min + Math.round(Math.random() * (max - min));
const DATA_INTERVAL = 60000;

function createDataDictModifier(dataDict, locale) {
	return function setValue(timeCursor, key, value) {
		const chartData = dataDict[timeCursor] || {
			timestamp: timeCursor,
			name: format(timeCursor, 'DD MMM YYYY HH:mm:ss', locale),
		};
		if (key) {
			chartData[key] = value;
		}
		dataDict[timeCursor] = chartData;
	};
}

function getData(groups, timeRange, locale) {
	const dataDict = {};
	const setValue = createDataDictModifier(dataDict, locale);

	const [startTimestamp, endTimestamp] = timeRange;
	setValue(startTimestamp);
	setValue(endTimestamp);

	groups[0].items.forEach(item => {
		const { min, max } = item.fingerprint.cpu;
		const { start, end } = item.time;
		const { name } = item.context.task;
		for (let timeCursor = start + DATA_INTERVAL; timeCursor < end; timeCursor += DATA_INTERVAL) {
			setValue(timeCursor, name, randomPercentage(min, max));
		}
		setValue(start, name, 0);
		setValue(end, name, 0);
	});

	const data = Object.values(dataDict);
	data.sort((a, b) => a.timestamp - b.timestamp);
	return data;
}

export default function TimeLineChart() {
	const { data: groups, timeRange } = useTimelineContext();

	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);

	const data = getData(groups, timeRange, locale);

	return (
		<ResponsiveContainer width="100%" height={100}>
			{/* <LineChart */}
			<AreaChart
				data={data}
				margin={{
					// 	top: 5,
					// 	right: 30,
					left: 240,
					// 	bottom: 5,
				}}
			>
				{/* <CartesianGrid strokeDasharray="3 3" /> */}
				<XAxis
					dataKey="timestamp"
					type="number"
					domain={['dataMin', 'dataMax']}
					tick={false}
					// interval="preserveStartEnd"
					// tick={props => {
					// 	console.log(props);
					// 	return (
					// 		<Text {...props} className="recharts-cartesian-axis-tick-value">
					// 			{format(props.payload.value, 'HH:mm', locale)}
					// 		</Text>
					// 	);
					// }}
				/>
				<YAxis type="number" domain={[0, 100]} />
				<Tooltip filterNull />
				{/* <Legend /> */}
				{/* <Line type="monotone" dataKey={groups[0].label} stroke="#8884d8" dot={false} /> */}
				<Area type="monotone" dataKey={groups[0].label} stroke="#8884d8" fill="#8884d8" />
				{/* <Line type="monotone" dataKey="task2" stroke="#82ca9d" /> */}
				{/* <Line type="monotone" dataKey="task3" stroke="#e96065" /> */}
			</AreaChart>
		</ResponsiveContainer>
	);
}
