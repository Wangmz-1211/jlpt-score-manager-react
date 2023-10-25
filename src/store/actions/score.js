const scoreAction = {
    setScoreRecords( scoreRecords) {
        return {
            type: 'SCORE_SET',
            payload: scoreRecords 
        }
    },
    clearScoreRecords() {
        return {
            type: 'SCORE_CLEAR',
            payload: []
        }
    }

}

export default scoreAction