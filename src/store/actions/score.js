const scoreAction = {
	setScoreRecords(scoreRecords) {
		return {
			type: 'SCORE_SET',
			payload: scoreRecords,
		}
	},
	clearScoreRecords() {
		return {
			type: 'SCORE_CLEAR',
			payload: [],
		}
	},
	replaceScoreRecordById(id, newRecord, oldRecords) {
		const newRecords = oldRecords.map((oldRecord) => {
			return oldRecord._id === newRecord._id ? newRecord : oldRecord
		})
		return {
			type: 'SCORE_REPLACE',
			payload: newRecords,
		}
	},
}

export default scoreAction
