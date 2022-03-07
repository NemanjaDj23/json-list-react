import React, { useState } from 'react';

import './index.css';

import List from './List/List';

const generateInitialState = () => {
	return new Array(1000).fill(true).map(() => ({
		id: `${Math.random()} - ${Math.random()}`,
		name: 'Nemanja',
		surname: 'Djurovic',
		email: 'ekonemanja@gmail.com',
		isBoolean: true,
		date: '2015-05-08T12:39:06 -02:00',
		longText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	}));
};

const Items = generateInitialState();

function App() {
	const [items, setItems] = useState<JSONItem[]>(Items);
	const handleChange = (index: number, updatedValue: JSONItem) => {
		const updatedItems = [...items];
		updatedItems[index] = updatedValue;
		setItems(updatedItems);
	};

	return (
		<div className="App">
			<h1>JSON List</h1>
			<List items={items} onChange={handleChange} />
		</div>
	);
}

export default React.memo(App);
