/* eslint-disable react/no-multi-comp */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';
import IconsProvider from '../IconsProvider';
import Layout from '../Layout';
import SidePanel from './SidePanel.component';

import { TALEND_T7_THEME_CLASSNAME } from '../Layout/constants';

const APPS_WITH_SIDEPANEL = ['tdc', 'tdp', 'tds', 'tfd', 'tic', 'tmc', 'mdm'];

const icons = {
	'talend-arrow-left': talendIcons['talend-arrow-left'],
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-download': talendIcons['talend-download'],
	'talend-star': talendIcons['talend-star'],
	'talend-opener': talendIcons['talend-opener'],
	'talend-world': talendIcons['talend-world'],
	'talend-user-circle': talendIcons['talend-user-circle'],
	'talend-group-circle': talendIcons['talend-group-circle'],
	'talend-roles': talendIcons['talend-roles'],
	'talend-license': talendIcons['talend-license'],
	'talend-projects': talendIcons['talend-projects'],
	'talend-activity': talendIcons['talend-activity'],
};

const actions = [
	{
		label: 'Preparations',
		icon: 'talend-dataprep',
		onClick: action('Preparations clicked'),
		active: true,
	},
	{
		label: 'Datasets',
		icon: 'talend-download',
		onClick: action('Datasets clicked'),
	},
	{
		label: 'Favorites',
		icon: 'talend-star',
		onClick: action('Favorites clicked'),
	},
];

const actionsLinks = [
	{
		label: 'Preparations',
		icon: 'talend-dataprep',
		href: '/preparations',
		active: true,
	},
	{
		label: 'Datasets',
		icon: 'talend-download',
		href: '/datasets',
	},
	{
		label: 'Favorites',
		icon: 'talend-star',
		href: '/favorites',
	},
];

const items = [
	{
		key: 'preparations',
		label: 'Preparations',
		icon: 'talend-dataprep',
	},
	{
		key: 'datasets',
		label: 'Datasets',
		icon: 'talend-download',
	},
	{
		key: 'favorites',
		label: 'Favorites',
		icon: 'talend-star',
	},
];

const other = [
	{
		key: 'users',
		label: 'Users',
		icon: 'talend-user-circle',
	},
	{
		key: 'groups',
		label: 'Groups',
		icon: 'talend-group-circle',
	},
	{
		key: 'roles',
		label: 'Roles',
		icon: 'talend-roles',
	},
	{
		key: 'licenses',
		label: 'Licenses',
		icon: 'talend-license',
	},
	{
		key: 'projects',
		label: 'Projects',
		icon: 'talend-projects',
	},
	{
		key: 'activity',
		label: 'Activity',
		icon: 'talend-activity',
	},
];

const stories = storiesOf('Navigation/SidePanel', module);

stories
	.addDecorator(story => (
		<div>
			<IconsProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.add('uncontrolled', () => (
		<SidePanel
			id="context"
			actions={actions}
			onSelect={action('onItemSelect')}
			tooltipPlacement="top"
		/>
	))
	.add('controlled', () => (
		<SidePanel
			id="context"
			actions={actions}
			onSelect={action('onItemSelect')}
			onToggleDock={action('onToggleDock')}
			tooltipPlacement="top"
		/>
	))
	.add('links', () => <SidePanel id="context" actions={actionsLinks} tooltipPlacement="top" />)
	.add('docked', () => <SidePanel actions={actions} docked tooltipPlacement="top" />)
	.add('minimised', () => (
		<SidePanel
			actions={actions}
			onToggleDock={action('Toggle dock clicked')}
			minimised
			tooltipPlacement="top"
		/>
	))
	.add('with a large amount of items', () => (
		<SidePanel
			actions={[...items, ...other, ...other, ...other]}
			onSelect={action('onItemSelect')}
			selected={items[1]}
			tooltipPlacement="top"
		/>
	))
	.add('reverse', () => (
		<SidePanel
			actions={items}
			onSelect={action('onItemSelect')}
			selected={items[1]}
			reverse
			tooltipPlacement="top"
		/>
	))
	.add('with layout', () => {
		class WithLayout extends React.Component {
			constructor() {
				super();
				this.state = { docked: false };
			}

			render() {
				const panel = (
					<SidePanel
						actions={[...items, ...other, ...other, ...other]}
						onSelect={action('onItemSelect')}
						docked={this.state.docked}
						tooltipPlacement="top"
					/>
				);
				return (
					<Layout mode="TwoColumns" one={panel}>
						<ol>
							{new Array(100).fill('This is some random content').map((item, num) => (
								<li key={num}>{item}</li>
							))}
						</ol>
					</Layout>
				);
			}
		}

		return <WithLayout />;
	})
	.add('reverse with layout', () => {
		const panelItems = items.concat([
			{
				key: 'longname',
				label: 'Some super super super long name',
				icon: 'talend-world',
			},
		]);
		const panel = (
			<SidePanel
				actions={panelItems}
				onSelect={action('onItemSelect')}
				reverse
				tooltipPlacement="top"
			/>
		);
		return (
			<Layout mode="TwoColumns" one={panel}>
				<ol>
					{new Array(100).fill('This is some random content').map((item, num) => (
						<li key={num}>{item}</li>
					))}
				</ol>
			</Layout>
		);
	});

const appStyle = require('../../stories/config/themes.scss');

APPS_WITH_SIDEPANEL.forEach(app => {
	stories.add(`🎨 [${app.toUpperCase()}] SidePanel`, () => (
		<div className={appStyle[app]}>
			<div className={TALEND_T7_THEME_CLASSNAME} style={{ height: '100vh' }}>
				<SidePanel id="context" actions={actions} tooltipPlacement="top" />
			</div>
		</div>
	));
});

stories.add('🎨 [Portal] reverse', () => (
	<div className={appStyle.portal}>
		<h1>SidePanel</h1>
		<p>
			Keep sidePanel reverse style even if <em>t7</em> styles are applied.
		</p>
		<div className={TALEND_T7_THEME_CLASSNAME} style={{ height: '100vh' }}>
			<SidePanel id="context" actions={actions} tooltipPlacement="top" reverse />
		</div>
	</div>
));
