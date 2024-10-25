import React from 'react';

interface JSONBeautifierProps {
	data: object;
}

export const JSONBeautifier: React.FC<JSONBeautifierProps> = ({data}) => {
	return (
		<div style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontFamily: 'monospace', maxWidth: '800px'}}>
			{JSON.stringify(data, null, 2)}
		</div>
	);
};

