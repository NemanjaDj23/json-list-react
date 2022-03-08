import React, { useCallback, useState } from 'react';

import './ItemField.scss';
import {
	formatDate, isDate, isEmail, parseDate,
} from '../../helpers';

type ItemFieldProps = {
	fieldName: string;
	fieldValue: FieldValue;
	onChange: (fieldName: string, fieldValue: FieldValue) => void;
};

enum FieldType {
	RADIO = 'radio',
	TEXT = 'text',
	EMAIL = 'email',
	DATE = 'date',
	NUMBER = 'number',
	TEXTAREA = 'textarea'
}

function getFieldInputType(fieldValue: string | number | boolean | JSONItem) {
	if (typeof fieldValue === 'string') {
		if (isEmail(fieldValue)) {
			return FieldType.EMAIL;
		}

		if (isDate(fieldValue)) {
			return FieldType.DATE;
		}

		return fieldValue.length < 50 ? FieldType.TEXT : FieldType.TEXTAREA;
	}

	if (typeof fieldValue === 'number') {
		return FieldType.NUMBER;
	}

	if (typeof fieldValue === 'boolean') {
		return FieldType.RADIO;
	}
	return undefined;
}

function ItemField({ fieldName, fieldValue, onChange }: ItemFieldProps) {
	const [fieldType] = useState(getFieldInputType(fieldValue));

	const handleInputChange = useCallback(
		(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = event?.currentTarget;
			onChange(name, value);
		},
		[onChange]
	);

	const handleRadioChange = useCallback(
		(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = event?.currentTarget;
			onChange(name, value === 'true');
		},
		[onChange]
	);

	const handleDateChange = useCallback(
		(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = event?.currentTarget;
			// Set only date when value is selected, disable clear of the date
			if (value) {
				onChange(name, value);
			}
		},
		[onChange]
	);

	return (
		<div className="ItemField">
			<span title={fieldType}>{fieldName}</span>

			{fieldType === FieldType.RADIO && (
				<div>
					<small>True</small>
					<input
						type="radio"
						name={fieldName}
						value="true"
						checked={fieldValue.toString() === 'true'}
						onChange={handleRadioChange}
					/>

					<small>False</small>
					<input
						type="radio"
						name={fieldName}
						value="false"
						checked={fieldValue.toString() === 'false'}
						onChange={handleRadioChange}
					/>
				</div>
			)}

			{fieldType === FieldType.TEXT && (
				<input
					type="text"
					name={fieldName}
					value={fieldValue as string}
					onChange={handleInputChange}
				/>
			)}

			{fieldType === FieldType.EMAIL && (
				<input
					type="email"
					name={fieldName}
					value={fieldValue as string}
					onChange={handleInputChange}
				/>
			)}

			{fieldType === FieldType.NUMBER && (
				<input
					type="number"
					name={fieldName}
					value={fieldValue as number}
					onChange={handleInputChange}
				/>
			)}

			{fieldType === FieldType.DATE && (
				<input
					type="datetime-local"
					name={fieldName}
					value={formatDate(parseDate(fieldValue as string))}
					onChange={handleDateChange}
				/>
			)}

			{fieldType === FieldType.TEXTAREA && (
				<textarea
					name={fieldName}
					rows={1}
					cols={50}
					value={fieldValue as string}
					onChange={handleInputChange}
				/>
			)}
			{fieldType === undefined && (
				<span className="simpleText">Array</span>
			)}
		</div>
	);
}

export default React.memo(ItemField);
