import React, { useState } from "react";
import cloneDeep from "clone-deep";
import Head from "next/head";

import Header from "../components/header";
import Footer from "../components/footer";

const generateRandomQuestion = () => {
	const getRandomInt = max => {
		return Math.floor(Math.random() * Math.floor(max));
	};

	const second = getRandomInt(9) + 1; // to avoid division-by-zero
	const result = getRandomInt(10);

	return {
		first: second * result,
		second,
		result,
		answered: -1, // -1 just to avoid null
		generatedAt: Date.now(),
		answeredAt: -1 // -1 just to avoid null
	};
};

function HomePage() {
	const [question, setQuestion] = useState(generateRandomQuestion());
	const [history, setHistory] = useState([]);

	const handleClick = clickedNumber => {
		question.answered = clickedNumber;
		question.answeredAt = Date.now();
		setHistory([cloneDeep(question), ...history]);
		setQuestion(generateRandomQuestion());
	};

	const buttons = [];
	for (let i = 0; i < 10; i++) {
		buttons.push(
			<button
				key={i}
				style={{ fontSize: "4rem" }}
				className="large shadowed"
				onClick={() => {
					handleClick(i);
				}}
			>
				{i}
			</button>
		);
	}

	const TimeDiff = props => (
		<span style={{ color: "gray", margin: "0.5rem" }}>
			{Math.round(
				((props.question.answeredAt - props.question.generatedAt) / 1000) * 10
			) / 10}{" "}
			seconds
		</span>
	);

	const HistoryLine = props => {
		const q = props.question;

		if (q.answered === q.result) {
			return (
				<div style={{ color: "green" }}>
					{q.first} &divide; {q.second} ={" "}
					{props.hasToDisplayCorrectAnswer ? q.result : "?"} GOOD
					<TimeDiff question={props.question} />
				</div>
			);
		}

		return (
			<div style={{ color: "red" }}>
				{q.first} &divide; {q.second} &ne;{" "}
				{props.hasToDisplayCorrectAnswer ? q.answered : "?"}
				<span style={{ color: "green" }}>
					{" "}
					= {props.hasToDisplayCorrectAnswer ? q.result : "?"}
				</span>{" "}
				BAD
				<TimeDiff question={props.question} />
			</div>
		);
	};

	const HistoryList = props =>
		props.history.slice(0, 150).map((m, i) => {
			if ((i + 1) % 5 === 0) {
				return (
					<React.Fragment key={m.generatedAt}>
						<HistoryLine
							key={m.generatedAt}
							question={m}
							hasToDisplayCorrectAnswer={i < 5}
						/>
						<br />
					</React.Fragment>
				);
			}

			return (
				<HistoryLine
					key={m.generatedAt}
					question={m}
					hasToDisplayCorrectAnswer={i < 5}
				/>
			);
		});

	return (
		<>
			<Header
				metaTitle="Online division quiz for kids"
				metaDesc="Online division quiz for kids helps learn basic mathematical skills."
				heading="Division quiz for kids"
			/>

			<p style={{ fontSize: "6em" }}>
				{question.first} &divide; {question.second} =
			</p>

			{buttons}

			<h2>
				History
				<small>
					<span style={{ color: "green" }}>
						{`good: ${history.reduce(
							(acc, c) => (c.result === c.answered ? acc + 1 : acc),
							0
						)} `}
					</span>
					<span style={{ color: "red" }}>
						{`bad: ${history.reduce(
							(acc, c) => (c.result !== c.answered ? acc + 1 : acc),
							0
						)} `}
					</span>
					<span>{`total: ${history.length} `}</span>
					<span style={{ color: "green" }}>
						{`last ${
							history.findIndex(c => c.result !== c.answered) < 0
								? history.length
								: history.findIndex(c => c.result !== c.answered)
						} was good`}
					</span>
				</small>
			</h2>

			<div>
				<HistoryList history={history} />
			</div>

			<Footer />
		</>
	);
}

export default HomePage;
