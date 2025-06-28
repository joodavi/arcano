import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import App from './App.tsx';
import { ROUTES } from './consts/routes.ts';
import './index.css';
import DatasetManager from './pages/DatasetManager.tsx';
import Home from './pages/Home.tsx';
import { VisualizationBuilder } from './pages/VisualizationBuilder.tsx';
import VisualizationManager from './pages/VisualizationManager.tsx';
import config from './types/Theme.ts';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: `${ROUTES.DATASET}/:datasetId`,
				element: <DatasetManager />
			},
			{
				path: `${ROUTES.DATASET}/:datasetId${ROUTES.VISUALIZATION}`,
				element: <VisualizationBuilder />,
			},
			{
				path: `${ROUTES.DATASET}/:datasetId${ROUTES.VISUALIZATION}/:visualizationId`,
				element: <VisualizationBuilder />,
			},
			{
				path: ROUTES.VISUALIZATION,
				element: <VisualizationManager />,
			},
		],
	}
])

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<ConfigProvider theme={config}>
				<RouterProvider router={router} />
			</ConfigProvider>
		</StrictMode>,
	);
} else {
	console.error("Root element not found");
}
