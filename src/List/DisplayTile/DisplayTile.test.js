import React from 'react';
import renderer from 'react-test-renderer';

import DisplayTile from './DisplayTile.component';

jest.mock('uuid');

const items = [
	{
		id: 1,
		name: 'Hello world',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		actions: [{
			type: 'action',
			label: 'edit',
			icon: 'fa fa-edit',
			onClick: jest.fn(),
		}, {
			type: 'action',
			label: 'delete',
			icon: 'fa fa-trash-o',
			onClick: jest.fn(),
		}],
		icon: 'fa fa-file-excel-o',
	},
	{
		id: 2,
		name: 'Foo',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-pdf-o',
	},
	{
		id: 2,
		name: 'Bar',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
	},
];

const columns = [
	{ key: 'id', label: 'Id' },
	{ key: 'name', label: 'Name' },
	{ key: 'author', label: 'Author' },
	{ key: 'created', label: 'Created' },
	{ key: 'modified', label: 'Modified' },
];

describe('DisplayTile', () => {
	it('should render 3 tiles with name as title by default', () => {
		// given
		const props = {
			items,
			columns,
			titleKey: undefined, // no title key defined
			iconKey: 'icon',
		};

		// when
		const wrapper = renderer.create(<DisplayTile {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render 3 tiles with id as title by setting', () => {
		// given
		const props = {
			items,
			columns,
			titleKey: 'id', // title key defined
			iconKey: 'icon',
		};

		// when
		const wrapper = renderer.create(<DisplayTile {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render 3 tiles with render a title buttons', () => {
		// given
		const props = {
			items,
			columns,
			iconKey: 'icon',
			onTitleClick: jest.fn(), // title click callback defined
		};

		// when
		const wrapper = renderer.create(<DisplayTile {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
