import React, { useCallback, useRef, useEffect } from 'react';

import './Item.scss';
import ItemView from '../ItemView/ItemView';
import ItemEditor from '../ItemEditor/ItemEditor';

type ItemProps = {
	index: number;
	value: { [key: string]: FieldValue };
	onChange: (index: number, value: JSONItem) => void;
	// eslint-disable-next-line react/require-default-props
	onMeasuredHeight?: (height: number) => void;
	// eslint-disable-next-line react/require-default-props
	style?: React.CSSProperties | undefined;
};

function Item({
	index, value, onChange, onMeasuredHeight, style,
}: ItemProps) {
	const ref = useRef<HTMLDivElement>(null);

	const handleChange = useCallback(
		(updatedValue: JSONItem) => {
			onChange(index, updatedValue);
		},
		[onChange, index]
	);

	useEffect(() => {
		if (onMeasuredHeight) {
			const height = ref.current?.getBoundingClientRect().height || 0;
			onMeasuredHeight(height);
		}
	}, [index, onMeasuredHeight]);

	return (
		<div className="Item" ref={ref} style={style}>
			<ItemView value={value} />
			<ItemEditor value={value} onChange={handleChange} />
		</div>
	);
}

export default React.memo(Item);
