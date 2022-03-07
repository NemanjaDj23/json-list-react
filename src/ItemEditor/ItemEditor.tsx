import React from 'react';

import './ItemEditor.scss';
import ItemField from './ItemField/ItemField';

type ItemEditorProps = {
	value: JSONItem;
	onChange: (value: JSONItem) => void;
};

export default function ItemEditor({ value, onChange }: ItemEditorProps) {
	const { id, ...restValues } = value;
	const handleChange = (fieldName: string, fieldValue: FieldValue) => {
		onChange({
			...value,
			[fieldName]: fieldValue,
		});
	};

	return (
		<form className="ItemEditor">
			{Object.keys(restValues).map((key: string) => (
				<ItemField
					key={key}
					fieldName={key}
					fieldValue={value[key] as FieldValue}
					onChange={handleChange}
				/>
			))}
		</form>
	);
}
