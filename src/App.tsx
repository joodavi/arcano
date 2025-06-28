import { BarChartOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router";
import arcanoLogo from './assets/arcano.svg';
import { ROUTES } from "./consts/routes";

const { useToken } = theme;

function App() {
	const { token } = useToken();
	const navigate = useNavigate();

	return (
		<Layout style={{ height: '100vh', backgroundColor: token.colorBgLayout }}>
			<Layout.Header style={{ 
					display: 'flex', 
					alignItems: 'center', 
					justifyContent: "space-between",
					gap: 10, 
					borderBottom: `2px solid ${token.colorPrimary}` 
				}}
			>
				<Link to={ROUTES.HOME} style={{ display: 'flex', alignItems: 'center' }} >
					<img src={arcanoLogo} width={100} alt="Arcano logo" />
				</Link>
				<Flex gap={10} align="center">
					<Button onClick={() => navigate(ROUTES.VISUALIZATION)} icon={<BarChartOutlined />}>
						My visualizations
					</Button>
					<Button onClick={() => navigate(ROUTES.HOME)} icon={<HomeOutlined />}>
						Home
					</Button>
				</Flex>
			</Layout.Header>
			<Layout.Content
				style={{
					margin: '30px 30px 5px 30px',
					backgroundColor: token.colorBgBase,
					display: 'flex',
					flexDirection: 'column',
					overflow: 'hidden',
					borderRadius: '10px',
					position: "relative"
				}}
			>
				<Outlet />
			</Layout.Content>
			<Layout.Footer style={{ padding: '20px', textAlign: 'center' }}>
				Arcano ©{new Date().getFullYear()}
			</Layout.Footer>
		</Layout>
	);
}

export default App;
