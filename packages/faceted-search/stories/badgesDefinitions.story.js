export const badgeName = {
	properties: {
		attribute: 'name',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Name',
		operator: {},
		operators: [],
		type: 'text',
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: ['contains', 'equals', 'notEquals', 'match a regexp'],
	},
};

export const badgeConnectionType = {
	properties: {
		attribute: 'connection.type',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Connection type',
		operator: {},
		operators: [],
		type: 'checkbox',
	},
	metadata: {
		badgePerFacet: '1',
		entitiesPerBadge: 'N',
		values: [
			{ id: 'amazon_s3', label: 'Amazon S3' },
			{ id: 'hdfs', label: 'HDFS' },
			{ id: 'kafka', label: 'Kafka' },
			{ id: 'localcon', label: 'Local connection' },
			{ id: 'salesforce', label: 'Salesforce' },
			{ id: 'aws_kinesis', label: 'AWS kinesis' },
		],
		operators: ['in'],
	},
};

export const badgeCustomAttributesType = {
	properties: {
		attribute: 'customAttr',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Custom Attribute',
		operator: {},
		operators: [],
		type: '',
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		values: [
			{ id: '1111', label: 'Custom attribute 1' },
			{ id: '2222', label: 'Custom attribute 2' },
			{ id: '3333', label: 'Custom attribute 3' },
			{ id: '4444', label: 'Custom attribute 4' },
			{ id: '5555', label: 'Custom attribute 5' },
			{ id: '6666', label: 'Custom attribute 6' },
		],
		operators: ['in'],
	},
};

export const badgePrice = {
	properties: {
		attribute: 'price',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Price',
		operator: {},
		operators: [],
		type: 'number',
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: [
			'equals',
			'notEquals',
			'greaterThan',
			'greaterThanOrEquals',
			'lessThan',
			'lessThanOrEquals',
		],
	},
};

export const badgeWithVeryLongName = {
	properties: {
		attribute: 'price',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'helloverybeautifullworldhowareyouinthislovelydaythesunishiningandtheskyisbright?',
		operator: {},
		operators: [],
		type: 'number',
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: [
			'equals',
			'notEquals',
			'greaterThan',
			'greaterThanOrEquals',
			'lessThan',
			'lessThanOrEquals',
		],
	},
};
