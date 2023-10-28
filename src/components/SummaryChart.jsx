import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { getScoreListByUserId } from '../api/score.ts'
import actions from '../store/actions'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)
const options = {
	responsive: true,
	scales: {
		y: {
			suggestedMax: 180
		},
	},
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Trend of Score',
		},
	},
}

export const SummaryChart = (props) => {
	// level : 'N1' | 'N2', default :  'N1'
	let { level } = props
	useEffect(() => {
		const fetchScoreList = async () => {
			const list = await getScoreListByUserId()
			props.setScoreRecords(list ? list : [{ _id: '' }])
		}
		if (
			!props.scoreRecords ||
			props.scoreRecords.length === 0 ||
			props.scoreRecords[0]._id === ''
		)
			fetchScoreList()
	}, [])

	const data = useMemo(() => {
		const filter = props.scoreRecords.filter((record) => {
			const N1pattern = /N1-20[1-2][0-9]-(07|12)/
			const N2pattern = /N2-20[1-2][0-9]-(07|12)/
			return (
				record.title &&
				(level === 'N2' ? N2pattern : N1pattern).test(
					record.title.trim()
				)
			)
		})
		const sort = filter.sort((a, b) => {
			const splitA = a.title.split('-'),
				splitB = b.title.split('-'),
				yearA = parseInt(splitA[1], 10),
				yearB = parseInt(splitB[1], 10),
				monthA = parseInt(splitA[2], 10),
				monthB = parseInt(splitB[2], 10)
			return yearA !== yearB ? yearA - yearB : monthA - monthB
		})
		return {
			labels: sort.map((rec) => rec.title),
			datasets: [
				{
					label: 'Total Score',
					data: sort.map((rec) => rec.total_score),
					borderColor: 'rgb(236,91,86)',
					backgroundColor: 'rgba(236,91,86,0.5)',
				},
				{
					label: 'Knowledge',
					data: sort.map((rec) => {
						return (
							parseInt(rec.vocabulary_score, 10) +
							parseInt(rec.grammar_score, 10)
						).toString()
					}),
					borderColor: 'rgb(56,117,246)',
					backgroundColor: 'rgba(56,117,246,0.5)',
				},
				{
					label: 'Reading',
					data: sort.map((rec) => rec.reading_score),
					borderColor: 'rgb(239,176,65)',
					backgroundColor: 'rgba(239,176,65,0.5)',
				},
				{
					label: 'Listening',
					data: sort.map((rec) => rec.listening_score),
					borderColor: 'rgb(114,193,64)',
					backgroundColor: 'rgba(114,193,64,0.5)',
				},
			],
		}
	}, [props.scoreRecords])

	return (
		<div>
			<Line options={options} data={data}></Line>
		</div>
	)
}

export default connect((state) => state.score, actions.score)(SummaryChart)
