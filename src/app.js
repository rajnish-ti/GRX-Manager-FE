import { Layout } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";

import ADDGrx from "./pages/AddGrx";
import EditGrx from "./pages/EditGrx";
import GrxList from "./pages/GrxList";

const { Header, Content } = Layout;

const routes = [
  {
    id: "1",
    title: "Grx List",
    route: "/",
    component: <GrxList />,
  },
  {
    id: "2",
    title: "Add Grx",
    route: "/add",
    component: <ADDGrx />,
  },
  {
    id: "3",
    title: "Update Grx",
    route: "/updateGrx/:id",
    component: <EditGrx />,
  },
];

// const getActiveKey = (location) => {
//   const data = routes.find((item) => item.route.includes(location.pathname));
//   if (data && data.id) {
//     return [data.id];
//   }
//   return [2];
// };

function App() {
  // const location = useLocation();
  // const navigate = useNavigate();

  return (
    <Layout>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ color: "white", fontWeight: "bold", fontSize: "22px" }}>
          GRX Manager
        </div>
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={getActiveKey(location)}
          items={[
            {
              id: "1",
              title: "Grx List",
              route: "/",
              component: <GrxList />,
            },
          ].map((val, index) => {
            const key = index + 1;
            return {
              key,
              label: val.title,
            };
          })}
          onClick={(e) => {
            const el = routes.find((i) => i.id === e.key);
            navigate(el.route);
          }}
          style={{ fontSize: "17px" }}
        /> */}
      </Header>
      <Content
        style={{
          padding: "0 20px",
          backgroundColor: "#f2f2f2",
          minHeight: "90vh",
        }}
      >
        <div style={{ marginTop: "10px" }}>
          <Routes>
            {routes.map((item) => (
              <Route
                key={item.key}
                path={item.route}
                element={item.component}
              />
            ))}
          </Routes>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
