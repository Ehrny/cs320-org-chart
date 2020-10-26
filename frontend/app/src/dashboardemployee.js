import React from 'react';
import ReactDOM from 'react-dom';
import logo from './imgs/logo.png';
import Orgchart from '@unicef/react-org-chart'
import 'antd/dist/antd.css';
import Drop from "./drop";
import './index.css';
import './dashboard.css';
import { Layout, Menu, Breadcrumb, Input, Select, Descriptions, Collapse, Modal, Button, Form, InputNumber ,DatePicker } from 'antd';
import {
    DesktopOutlined,
    UserOutlined,
    LogoutOutlined,
    FundViewOutlined,
    UploadOutlined
  } from '@ant-design/icons';
  

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
          
          downloadingChart: false,
          config: {},
          highlightPostNumbers: [1],
          searchparam : 'First',
        

          firstName : '',
          lastName : '',
          companyId : 0,
          password : '',
          positionTitle : '',
          companyName : '',
          isManager : false,
          employeeId : 0,
          email : '',
          startDate : '',
        };
      
        onCollapse = collapsed => {
          console.log(collapsed);
          this.setState({ collapsed });
        };


        handleChange = (searchparam) =>{
          const sp = searchparam
          this.setState({searchparam: sp})
          console.log(`selected ${sp}`);
        };


        handleSearch = (emplID) => {
          console.log('First seach pass, searching by: ', this.state.searchparam)
          if(this.state.searchparam=='EmplID')
          {
            console.log('searching by: ', this.state.searchparam)
            let resp = fetch('/company/3/employee/' + emplID)
            //let resp = fetch('/naivelogin/'+emplID)//company/3/employee/1')
                            .then(response => {
                              console.log(response);
                              return response.json()})
                            .then(json =>
                              {
                                console.log(json)
                                this.setState({
                                firstName : json.firstName,
                                lastName : json.lastName,
                                companyId : json.companyId,
                                password : json.password,
                                positionTitle : json.positionTitle,
                                companyName : json.companyName,
                                isManager : json.isManager,
                                employeeId : json.employeeId,
                                email : json.email,
                                startDate : json.startDate})
                              })
          }
          if(this.state.searchparam=='First')
          {
            console.log('Searching by firstname')
          }
          if(this.state.searchparam=='Last')
          {
            console.log("Searching by lastname")
          }
        }               


        render() {

          const { tree, downloadingChart } = this.state
          //For downloading org chart as image or pdf based on id
          const downloadImageId = 'download-image'
          const downloadPdfId = 'download-pdf'

          return (
            <Layout style={{ minHeight: '100vh' }}>
              <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                  
        <Menu.Item key="2" icon={<DesktopOutlined />}>View</Menu.Item>
                 
        <Menu.Item key="6" icon={<FundViewOutlined />}>Detail</Menu.Item>
                  
                    <hr></hr>

        <Menu.Item key="1" icon={<LogoutOutlined />} >
           <a href="./login" onClick={this.lgin}>logout</a>
        </Menu.Item>
                
      </Menu>
    </Sider>

           
    <Layout className="site-layout">

<Header className="site-layout-background" style={{ padding: 0 }} >
  <div>          

  <img src={logo} className='img' alt="logo" />

    <Select className="selectColumn" defaultValue="First" onChange={this.handleChange} size="large">
      <Option value="First" >First Name</Option>
      <Option value="Last">Last Name</Option>
      <Option value= "EmplID"> Employee ID</Option>
      </Select>

      <Search className="search-bar" placeholder="input search text" enterButton="Search" size="large"
                    onSearch={value=>this.handleSearch(value)} /> 
      <h1>
        {this.state.firstName} {this.state.lastName}
      </h1>
  </div>

</Header>

<Content style={{ margin: '0 16px' }}>
  <Breadcrumb style={{ margin: '16px 0' }}>
  <Breadcrumb.Item>Matches found: </Breadcrumb.Item>
  
  </Breadcrumb>
  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

  </div>
</Content>
  <Footer style={{ textAlign: 'center' }}>
    CS320 Team 4 Runtime Terror
  </Footer>


  <dir className ="test" >
      <hr></hr>
    <Collapse defaultActiveKey={['1']} onChange={callback}>
    <Panel header="Detail Info" key="1" >
<Descriptions Item style={{ textAlign: 'left' }}>
<Descriptions.Item label="First Name" bordered>{this.state.firstName}</Descriptions.Item>
<Descriptions.Item label="Last Name">{this.state.lastName}</Descriptions.Item>
<Descriptions.Item label="Position">{this.state.positionTitle}</Descriptions.Item>
<Descriptions.Item label="Company">{this.state.companyName}</Descriptions.Item>
        </Descriptions>
      </Panel>
    </Collapse>
  </dir>
</Layout>
</Layout>
);
}
}

