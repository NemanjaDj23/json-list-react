import React, { useState } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import './List.scss';
import Item from '../Item/Item';

type ListProps = {
 items: JSONItem[];
 onChange: (index: number, value: JSONItem) => void;
};

const ItemRenderer = React.memo(
	({
		data,
		index,
		style,
	}: {
	data: ListProps;
	index: number;
	style: React.CSSProperties;
	}) => (
		<Item
			key={data.items[index].id || index}
			index={index}
			value={data.items[index]}
			onChange={data.onChange}
			style={style}
		/>
	)
);

function List(props: ListProps) {
	const { items, onChange } = props;
	const [itemHeight, setItemHeight] = useState<number>(0);

	if (itemHeight === 0) {
		return (
			<Item
				index={0}
				value={items[0]}
				onChange={onChange}
				onMeasuredHeight={setItemHeight}
			/>
		);
	}

	return (
		<div className="List">
			<AutoSizer>
				{({ height, width }) => (
					<FixedSizeList
						height={height}
						width={width}
						itemCount={items.length}
						itemSize={itemHeight}
						itemData={props}
					>
						{ItemRenderer}
					</FixedSizeList>
				)}
			</AutoSizer>
		</div>
	);
}

export default React.memo(List);
