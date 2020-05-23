/** @jsx jsx */
import { jsx, wrapTSX, Row, Col } from 'lumino-tsx';
import * as widgets from '@lumino/widgets';

import '@lumino/default-theme/style/index.css';
import './index.css';

const DockPanel = wrapTSX(widgets.DockPanel);
const Panel = wrapTSX(widgets.Panel);
const Widget = wrapTSX(widgets.Widget);

const app = <DockPanel id="main" spacing={4}>
	<Row>
		<Col flex={2}>
			<Panel flex={2} title='Green'>
				<Widget>
					<div style={{ background: '#27ae60' }} />
				</Widget>
			</Panel>
			<Panel title='Yellow'>
				<Widget>
					<div style={{ background: '#f1c40f' }} />
				</Widget>
			</Panel>
		</Col>
		<Panel flex={2} title='Red'>
			<Widget>
				<div style={{ background: '#e74c3c' }} />
			</Widget>
		</Panel>
		<Panel title='Blue'>
			<Widget>
				<div style={{ background: '#3498db' }} />
			</Widget>
		</Panel>
	</Row>
</DockPanel> as widgets.DockPanel;

Widget.attach(app, document.body);

window.onresize = () => app.update();
