import React from 'react';

import './ItemView.scss';

type ItemViewProps = {
  value: JSONItem;
};

export default function ItemView({ value }: ItemViewProps) {
	return <pre className="ItemView">{JSON.stringify(value, null, 2)}</pre>;
}
