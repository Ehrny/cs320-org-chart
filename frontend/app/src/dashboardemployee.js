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

  import { Modal, Button } from 'antd';


  import { Form,InputNumber} from 'antd';

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




  const onFinish = (values) => {
    console.log(values);
  };
   


  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };




export class Dashboardemployee extends React.Component{
 


  
        state = {
          collapsed: false,
        };
      
        onCollapse = collapsed => {
          console.log(collapsed);
          this.setState({ collapsed });
        };


        state = {
          addEmp: false,
          dropEmp: false,
          editEmp: false,
        };
      
        addEmp(modal1Visible) {
          this.setState({ modal1Visible });
        }
      
        dropEmp(modal2Visible) {
          this.setState({ modal2Visible });
        }
        editEmp(modal3Visible) {
          this.setState({ modal3Visible });
        }

 


        render() {
          return (
            <Layout style={{ minHeight: '100vh' }}>
              <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                  
        <Menu.Item key="2" icon={<DesktopOutlined />}>View</Menu.Item>


        
        <SubMenu key="sub1" disabled icon={<UserOutlined />} title="Manage">
                    
        <Menu.Item key="3"onClick={()=>this.addEmp(true)}> add </Menu.Item> 
                   
          <Modal
          title="Add Employee"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.addEmp(false)}
          onCancel={() => this.addEmp(false)}
        >
         


         <Form {...layout} name="nest-messages" onFinish={onFinish} >
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'EmployeeID']}
        label="EmployeeID"
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'positionTitle']} label="positionTitle">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'Tag']} label="Tag">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

   









        </Modal>



       <Menu.Item key="4" onClick={()=>this.dropEmp(true)}>drop</Menu.Item>

          <Modal
          title="Drop Employee"
          style={{ top: 20 }}
          visible={this.state.modal2Visible}
          onOk={() => this.dropEmp(false)}
          onCancel={() => this.dropEmp(false)}
        >
          <p>contents...</p>
      
        </Modal>
  

        <Menu.Item key="5"onClick={()=>this.editEmp(true)}>edit</Menu.Item>

          <Modal
          title="Edit Employee"
          style={{ top: 20 }}
          visible={this.state.modal3Visible}
          onOk={() => this.editEmp(false)}
          onCancel={() => this.editEmp(false)}
        >
          <p>contents...</p>

     
        </Modal>
        
        </SubMenu>

                 
        <Menu.Item key="6" icon={<FundViewOutlined />}>Detail</Menu.Item>
                  
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
    <Descriptions.Item label="First Name" bordered>...</Descriptions.Item>
    <Descriptions.Item label="Last Name">...</Descriptions.Item>
    <Descriptions.Item label="Position">...</Descriptions.Item>
  </Descriptions>,
    </Panel>
    
  </Collapse>,
 </dir>


  </Layout>
            </Layout>



          );
        }
      }
      
