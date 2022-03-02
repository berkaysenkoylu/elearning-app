import React from 'react';

import Table from '../../../../../UI/Table/Table';
import { quizData } from '../../../../../../assets/exampleData';
import Graph from '../../../../../Graph/Graph';

const QuizStats = props => {
    let headerData = ['Name'];
    let rows = [];
    let questionToUserAnswersData = [];

    quizData[0].answers.forEach(question => {
        headerData.push('Q' + question.questionNumber);
        questionToUserAnswersData.push({
            name: 'Q' + question.questionNumber,
            correct: 0,
            incorrect: 0
        });
    });
    headerData.push('Correct answers');
    headerData.push('Points');

    for (let i = 0; i < quizData.length; i++) {
        let data = quizData[i];
        let row = [];

        row.push({
            value: data.firstName + ' ' + data.lastName
        });

        data.answers.forEach((answer, index) => {
            row.push({
                value: answer.selectedIndex,
                showIcon: true,
                icon: answer.isCorrect ? 'checkmark' : 'cross',
                changeColor: !answer.isCorrect
            });

            let copiedQuestionData = {...questionToUserAnswersData[index]};

            if (answer.isCorrect) {
                copiedQuestionData.correct += 1;
            } else {
                copiedQuestionData.incorrect += 1;
            }

            questionToUserAnswersData[index] = {...copiedQuestionData}
        });

        let correctAnswers = data.answers.filter(answer => answer.isCorrect).length;

        row.push({
            value: correctAnswers
        });
        row.push({
            value: parseFloat(((correctAnswers / data.answers.length) * 100).toFixed(2))
        });

        rows.push(row);
    }

    return (
        <div>
            <Table headers={headerData} rows={rows} />

            <Graph
                graphType='bar'
                data={questionToUserAnswersData}
                graphTitle='Users answers'
                dataKeyxAxis='Questions'
                bars={[{ name: 'correct', color: '#6BA006' }, { name: 'incorrect', color: '#AC0B06' }]}
            />
        </div>
    )
}

export default QuizStats;