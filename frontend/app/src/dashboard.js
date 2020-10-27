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
    console.log('callback key:', key);
  }

  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const { Search } = Input;
  const { Option } = Select;
  



   
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };


export class Dashboard extends React.Component{
 


  constructor(props) {
    super(props);
    this.state = {
  
  collapsed: false,
  downloadingChart: false,
  config: {},
  highlightPostNumbers: [1],
  searchparam : 'First',

  addEmp: false,
  dropEmp: false,
  editEmp: false,
  
  
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

    firstNameTemp: '',
      lastNameTemp: '',
      companyIdTemp: 0,
      passwordTemp: '',
      positionTitleTemp: '',
      companyNameTemp: '',
      isManagerTemp: false,
      employeeIdTemp: 0,
      emailTemp: '',
      startDateTemp: ''
    };
} 


   //print the Add Object
   addonFinish = event => {
    console.log(this.state);
  };

  //put the input value into state
  handleAdd = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  editonFinish = event => {
    console.log(this.state);
  };

  handleEdit = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };


    onFinish = onFinish => {
     console.log(onFinish);
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

      
        addEmp(modal1Visible) {
          this.setState({ modal1Visible });
        }
      
        dropEmp(modal2Visible) {
          this.setState({ modal2Visible });
        }
        editEmp(modal3Visible) {
          this.setState({ modal3Visible });
          this.setState({
           
            firstNameTemp: this.state.firstName,
            lastNameTemp: this.state.lastName,
           companyIdTemp: this.state.companyId,
           passwordTemp: this.state.password,
          positionTitleTemp: this.state.positionTitle,
       companyNameTemp: this.state.companyName,
       isManagerTemp: this.state.isManager,
       employeeIdTemp:this.state.employeeId,
       emailTemp: this.state.email,
       startDateTemp: this.state.startDate,
          });
        }

        importjson(modal4Visible)
        {
          this.setState({ modal4Visible });
        }


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

                  <Menu.Item key="2" onClick={this.view}  icon={<DesktopOutlined />}>View</Menu.Item>



                  <SubMenu key="sub1" icon={<UserOutlined />} title="Manage">
                  <Menu.Item key="3"onClick={()=>this.addEmp(true)}> add </Menu.Item> 
                   
                   <Modal
                   title="Add Employee"
                   style={{ top: 20 }}
                   visible={this.state.modal1Visible}
                   onOk={() => this.addEmp(false)}
                   onCancel={() => this.addEmp(false)}
                 >
                  
         
         
                  <Form {...layout} name="nest-messages" onFinish={this.state.onFinish} onFinish={this.onFinish} >
               <Form.Item
                 name={['user', 'firstName']}
                 label="First Name"
                 rules={[{required: false}]}
               >
             <Input
              value="ON9" onChange={this.on9}
             />  

               </Form.Item>
         
               <Form.Item
                 name={['user', 'lastName']}
                 label="Last Name"
                 rules={[{required: false}]}
               >
               <Input />   
               </Form.Item>
         
               <Form.Item
                 name={['user', 'email']}
                 label="Email"
                 rules={[{type: 'email',required: false, } ]}
               >
                 <Input />
                 
               </Form.Item>
               <Form.Item
                 name={['user', 'EmployeeID']}
                 label="EmployeeID"
               >
                 <Input type='number'/>       
               </Form.Item>
         
               <Form.Item
                 name={['user', 'ManagerID']}
                 label="ManagerID"
               >
                 <InputNumber />       
               </Form.Item>
         
               <Form.Item
                 name={['user', 'isManager']}
                 label="Is Manager?"
               >
               <Select >
                 <Option value="True">Yes</Option>
                 <Option value="False">No</Option>
               </Select>
            
          </Form.Item>
         
          <Form.Item
                 name={['user', 'startDate']}
                 label="startDate"
               >
               <DatePicker style={{ width: '50%' }} />
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

                      <Menu.Item key="4" onClick={()=>this.dropEmp(true)}>
                        drop
                      </Menu.Item>

                      <Modal title="Drop Employee" style={{ top: 20 }} visible={this.state.modal2Visible} onOk={() => this.dropEmp(false)} onCancel={() => this.dropEmp(false)}>
                      <p>You selected this employee</p>
                     <hr></hr>
                  <Descriptions Item style={{ textAlign: 'left' }}>
                  <Descriptions.Item label="First Name" bordered>{this.state.firstName}</Descriptions.Item>
                  <Descriptions.Item label="Last Name">{this.state.lastName}</Descriptions.Item>
                  <Descriptions.Item label="Position">{this.state.positionTitle}</Descriptions.Item>
                  <Descriptions.Item label="Company">{this.state.companyName}</Descriptions.Item>
                  <Descriptions.Item label="Company ID">{this.state.companyId}</Descriptions.Item>
                  <Descriptions.Item label="Manager">{this.state.isManager.toString()}</Descriptions.Item>
                  <Descriptions.Item label="Employee ID">{this.state.employeeId}</Descriptions.Item>
                  <Descriptions.Item label="Manager ID">{this.state.man}</Descriptions.Item>
                  <Descriptions.Item label="Start Date">{this.state.startDate}</Descriptions.Item>
                  <Descriptions.Item label="Email">{this.state.email}</Descriptions.Item>
                          </Descriptions>

                          <Button type="primary" htmlType="submit">
                                      Submit
                                    </Button>
                      </Modal>


                      <Menu.Item key="5"onClick={()=>this.editEmp(true)}>edit</Menu.Item>
                      
                      <Modal
                   title="Edit Employee"
                   style={{ top: 20 }}
                   visible={this.state.modal3Visible}
                   onOk={() => this.editEmp(false)}
                   onCancel={() => this.editEmp(false)}
                 >

              <Form {...layout} name="nest-messages" onFinish={this.editonFinish} >

                      <Form.Item
                 name={['user', 'firstName']}
                 label="First Name"
               >
           <Input 
                    placeholder = {this.state.firstName} 
                    type="text"
                    name="firstNameTemp"
                    value={this.state.firstName}
                    onChange={this.handleEdit} 
                    />
               </Form.Item>
         
               <Form.Item
                 name={['user', 'lastName']}
                 label="Last Name"
                 rules={[
                   {
                     required: false,
                   },
                 ]}
               >
            <Input 
                    placeholder = {this.state.lastName} 
                    type="text"
                    name="lastNameTemp"
                    value={this.state.lastName}
                    onChange={this.handleEdit} 
                    />
               </Form.Item>
         
               <Form.Item
                 name={['user', 'email']}
                 label="Email"
                 rules={[
                   {
                     type: 'email',required: false,
                   },
                 ]}
               >
               <Input 
                    placeholder = {this.state.email} 
                    type="text"
                    name="emailTemp"
                    value={this.state.email}
                    onChange={this.handleEdit} 
                    />
                 
               </Form.Item>
               <Form.Item
                 name={['user', 'EmployeeID']}
                 label="EmployeeID"
               >
                  <Input 
                    placeholder = {this.state.employeeId} 
                    type="text"
                    name="employeeIdTemp"
                    value={this.state.employeeId}
                    onChange={this.handleEdit} 
                    />
               </Form.Item>
         
               <Form.Item
                 name={['user', 'ManagerID']}
                 label="ManagerID"
               >
                 <Input 
                    placeholder = {this.state.ManagerID} 
                    type="text"
                    name="ManagerIDTemp"
                    value={this.state.ManagerID}
                    onChange={this.handleEdit} 
                    />    
               </Form.Item>
         
               <Form.Item
                 name={['user', 'isManager']}
                 label="Is Manager?"
               >
               <Select defaultValue="Option1-1">
                 <Option value="Option1-1">Yes</Option>
                 <Option value="Option1-2">No</Option>
            
               </Select>
            
          </Form.Item>
         
          <Form.Item
                 name={['user', 'startDate']}
                 label="startDate"
               >
               <DatePicker style={{ width: '50%' }} placeholder={this.state.startDate}name="startDateTemp"
                    value={this.state.startDate}
                    onChange={this.handleEdit} />
          </Form.Item>
         
               <Form.Item name={['user', 'positionTitle']} label="positionTitle">
               <Input 
                    placeholder = {this.state.positionTitle} 
                    type="text"
                    name="positionTitleTemp"
                    value={this.state.positionTitle}
                    onChange={this.handleEdit} 
                    />   
               </Form.Item>
               <Form.Item name={['user', 'Tag']} label="Tag">
                 <Input.TextArea />
               </Form.Item>
           
               <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                    <Button type="primary" htmlType="submit">
                                      save
                                    </Button>
                                  </Form.Item>
                                  
                                  </Form>
                           

                      </Modal>
                  </SubMenu>


                  <Menu.Item key="6" icon={<UploadOutlined />} onClick={()=>this.importjson(true)}>Import</Menu.Item>
                  <Modal title = "Upload JSON" style={{ top: 20}} visible={this.state.modal4Visible} onOk={() => this.importjson(false)} onCancel={() => this.importjson(false)}>
                    <p className="dndtitle">Upload Json files from your PC</p>
                    <div className="dndcontent">
                      <Drop />
                    </div>
                  </Modal>
                  
                  <Menu.Item key="7" icon={<FundViewOutlined />}>Detail</Menu.Item>
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
                  <Descriptions.Item label="Company ID">{this.state.companyId}</Descriptions.Item>
                  <Descriptions.Item label="Manager">{this.state.isManager.toString()}</Descriptions.Item>
                  <Descriptions.Item label="Employee ID">{this.state.employeeId}</Descriptions.Item>
                  <Descriptions.Item label="Manager ID">{this.state.man}</Descriptions.Item>
                  <Descriptions.Item label="Start Date">{this.state.startDate}</Descriptions.Item>
                  <Descriptions.Item label="Email">{this.state.email}</Descriptions.Item>
                          </Descriptions>
                        </Panel>
                      </Collapse>
                    </dir>
              </Layout>
            </Layout>
          );
        }
      }
      
