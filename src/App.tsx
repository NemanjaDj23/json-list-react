import React, { useState } from 'react';

import './index.css';

import List from './List/List';

const generateInitialState = () => {
	return new Array(1000).fill(true).map(() => ({
		id: `${Math.random()} - ${Math.random()}`,
		name: 'Nemanja',
		surname: 'Djurovic',
		email: 'nemanja@gmail.com',
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

	const onFileOpen = (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		reader.onload = (readerEvent) => {
			const content = JSON.parse((readerEvent.target?.result as string) || '');
			setItems(content);
		};
		if (inputEvent.target?.files?.[0]) {
			reader.readAsText(inputEvent.target.files[0]);
		}
	};

	return (
		<div className="App">
			<h1>JSON List</h1>
			<input type="file" accept="applicaton/json" onChange={onFileOpen} />
			<List key={items[0]?.id} items={items} onChange={handleChange} />
		</div>
	);
}

export default React.memo(App);
