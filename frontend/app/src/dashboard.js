import React from 'react';
import ReactDOM from 'react-dom';
import logo from './imgs/logo.png';
import 'antd/dist/antd.css';
import './index.css';
import './dashboard.css';
import { Layout, Menu, Breadcrumb, Input, Select } from 'antd';
import {
    DesktopOutlined,
    UserOutlined,
    LogoutOutlined,
    FundViewOutlined,
  } from '@ant-design/icons';
  import { Descriptions } from 'antd';

  import { Collapse } from 'antd';

  const { Panel } = Collapse;
  function callback(key) {
    console.log(key);
  }

  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const { Search } = Input;
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }


export class Dashboard extends React.Component{
 
        state = {
          collapsed: false,
        };
      
        onCollapse = collapsed => {
          console.log(collapsed);
          this.setState({ collapsed });
        };

   

        render() {
          return (
            <Layout style={{ minHeight: '100vh' }}>
              <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                  
                  <Menu.Item key="2" icon={<DesktopOutlined />}>
                    View
                  </Menu.Item>
                  <SubMenu key="sub1" icon={<UserOutlined />} title="Manage">
                    <Menu.Item key="3">add</Menu.Item>
                    <Menu.Item key="4">drop</Menu.Item>
                    <Menu.Item key="5">edit</Menu.Item>
                  </SubMenu>
                 
                  <Menu.Item key="6" icon={<FundViewOutlined />}>
                    Detail
                  </Menu.Item>
                  
                    <hr></hr>
                  <Menu.Item key="1" icon={<LogoutOutlined />} >
                  <a href="./login" onClick={this.lgin}>logout</a>
                  </Menu.Item>
                </Menu>
              </Sider>

           

              <Layout className="site-layout">

              <div className= 'imageContainer'>
                <img src={logo} className='img' alt="logo" />   
              </div>





                <Header className="site-layout-background" style={{ padding: 0 }} >
                <div>          
                  
                  <Select className="selectColumn" defaultValue="First" onChange={handleChange} size="large">
                    <Option value="First" >First Name</Option>
                    <Option value="Last">Last Name</Option>
                    </Select>
    
                    <Search className="search-bar" placeholder="input search text" enterButton="Search" size="large"
                                  onSearch={value => console.log(value)} /> 
                  </div>
                </Header>

                <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Org chart</Breadcrumb.Item>
                  
                  </Breadcrumb>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                     tree
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>CS320 Team 4 Runtime Terror</Footer>
            

<dir className ="test" >
    <hr></hr>
   <Collapse defaultActiveKey={['1']} onChange={callback}>
    <Panel header="Detail Info" key="1">
      < Descriptions title="Employee Info" >
    <Descriptions.Item label="First Name" bordered>First</Descriptions.Item>
    <Descriptions.Item label="Last Name">last</Descriptions.Item>
    <Descriptions.Item label="Position">manager</Descriptions.Item>
  </Descriptions>,
    </Panel>
    
  </Collapse>,
 </dir>


  </Layout>
            </Layout>



          );
        }
      }
      
