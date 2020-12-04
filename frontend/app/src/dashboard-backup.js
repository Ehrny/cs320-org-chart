import React from 'react'
import OrgChart from '@unicef/react-org-chart'
import avatarPersonnel from './assets/avatar-personnel.svg'
import {tree} from './Tree'
import logo from './imgs/logo.png';
import Drop from './drop'
import 'antd/dist/antd.css';
import './index.css';
import './dashboard.css';
import { Layout, Menu, Breadcrumb, Input, Select } from 'antd';
import {DesktopOutlined,UserOutlined,LogoutOutlined,FundViewOutlined,UploadOutlined,} from '@ant-design/icons';
import { Descriptions } from 'antd';
import { Collapse } from 'antd';
import { Modal, Button } from 'antd';
import { Form,InputNumber} from 'antd';
import { getChildren, getParent, handleExportedJson } from './treerender';
import {tree} from './Tree'

  const { Panel } = Collapse;
  function callback(key) {
    console.log(key);
  }

  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const { Search } = Input;
  const { Option } = Select;

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


export class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      initialroot: 1,
      tree: tree,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
      searchparam : 'First',
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
    }
  }

  getTree = id => {
    // /company/1/employee/<employeeI>?treeDepth=d
    return getChildren(id)
  }

  handleDownload = () => {
    this.setState({ downloadingChart: false })
  }

  handleOnChangeConfig = config => {
    this.setState({ config: config })
  }

  handleLoadConfig = () => {
    const { config } = this.state
    return config
  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleChange = (searchparam) =>{
    const sp = searchparam
    this.setState({searchparam: sp})
    console.log(`selected ${sp}`);
  }

  addEmp(modal1Visible) {
    this.setState({ modal1Visible });
  }

  dropEmp(modal2Visible) {
    this.setState({ modal2Visible });
  }
  editEmp(modal3Visible) {
    this.setState({ modal3Visible });
  }

  importjson(modal4Visible)
        {
          this.setState({ modal4Visible });
        }

        handleSearch = (emplID) => {
          console.log('First serach pass, searching by: ', this.state.searchparam)
          if(this.state.searchparam=='EmplID')
          {
            if('EmplID'!==0)
            {
                console.log('searching by: ', this.state.searchparam)
                let resp = fetch('/company/3/employee/' + emplID)
                                .then(response => {
                                  return response.json()})
                                .then(json =>
                                  {
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
                let resp2 = fetch('/company/1/employee/'+emplID+'?treeDepth='+'2').then(
                  response => {
                    console.log(response.status);
                    return response.json()}
                ).then(json=>{console.log(json)})
              }
              
                                
              else
              {
                console.log("made a blank search");
              }
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
        <SubMenu key="sub1" icon={<UserOutlined />} title="Manage">
                    
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

              <div className= 'imageContainer'>
                <img src={logo} className='img' alt="logo" />   
              </div>





                <Header className="site-layout-background" style={{ padding: 0 }} >
                <div>          
                  
                  <Select className="selectColumn" defaultValue="First" onChange={this.handleChange} size="large">
                    <Option value="First" >First Name</Option>
                    <Option value="Last">Last Name</Option>
                    <Option value= "EmplID"> Employee ID</Option>
                    </Select>
    
                    <Search className="search-bar" placeholder="input search text" enterButton="Search" size="large"
                                   onSearch={value=>this.handleSearch(value)} /> 

                  </div>
                </Header>

                <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                  
                  </Breadcrumb>
                  
            <OrgChart
              tree={tree}
              downloadImageId={downloadImageId}
              downloadPdfId={downloadPdfId}
              onConfigChange={config => {
                this.handleOnChangeConfig(config)
              }}
              loadConfig={d => {
                let configuration = this.handleLoadConfig(d)
                if (configuration) {
                  return configuration
                }
              }}
              downlowdedOrgChart={d => {
                this.handleDownload()
              }}
              loadImage={d => {
                return Promise.resolve(avatarPersonnel)
              }}
              loadParent={d => {
                const parentData = getParent(d)
                return parentData
              }}
              loadChildren={d => {
                const childrenData = getChildren(d.id)
                return childrenData
              }}
            />

                </Content>
                <Footer style={{ textAlign: 'center' }}>CS320 Team 4 Runtime Terror</Footer>
            

              <dir className ="test" >
                  <hr></hr>
                <Collapse defaultActiveKey={['1']} onChange={callback}>
                  <Panel header="Detail Info" key="1">
                    < Descriptions title="Employee Info" >
                          <Descriptions.Item label="First Name" bordered>{this.state.firstName}</Descriptions.Item>
                  <Descriptions.Item label="Last Name">{this.state.lastName}</Descriptions.Item>
                  <Descriptions.Item label="Position">{this.state.positionTitle}</Descriptions.Item>
                </Descriptions>,
                  </Panel>
                  
                </Collapse>,
              </dir>


                </Layout>
            </Layout>



          );
        }
      }