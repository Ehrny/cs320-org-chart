import React from 'react';
import logo from './imgs/logo.png';
import 'antd/dist/antd.css';
import Drop from "./drop";
import './index.css';
import './dashboard.css';
import IconButton from '@material-ui/core/IconButton';
import { Layout, Menu, Breadcrumb, Input, Select, Descriptions, Collapse, Modal, Button, Form, InputNumber ,DatePicker } from 'antd';
import {DesktopOutlined, BellOutlined, UserOutlined, LogoutOutlined, FundViewOutlined, ClockCirclieOutlined, UploadOutlined} from '@ant-design/icons';
import { getChildren, getParent, handleFetchedTree, translate, initializeTree, getNode } from './treeparse';
import {DisplayTree} from './displaytree';
import { AutoComplete, notification, Badge} from 'antd';//string for Notification function locate above "export class Dashboardmanager extends React.Component {"
import { getUser, removeUserSession } from './components/session';


const url = "http://localhost:5000/"

  const key = 'updatable';

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
    let user = JSON.parse(getUser());
    this.state = {
          tree:null,  didTreeChange:false, defaultTreeDepth: 3, getChartfromRoot: 1, collapsed: false,downloadingChart: false, config: {},
          highlightPostNumbers: [1],searchparam : 'First', addEmp: false,dropEmp: false, editEmp: false,firstName : '',lastName : '',
          companyId : user.companyId, password : '',
          positionTitle : '',companyName : '',
          isManager : false,employeeId : 0, email : '',startDate : '',firstNameTemp: '',lastNameTemp: '',companyIdTemp: 0,
          passwordTemp: '',positionTitleTemp: '',companyNameTemp: '',isManagerTemp: false,
          employeeIdTemp: 0, emailTemp: '', startDateTemp: '',transEmp: false, searcherror:"",
          managerId: 0,autoFirst: [], autoLast: [],  autoOption: [],  autoEmpty: [],  managerList: [], employeeList: [], 
          user: getUser(),
          notifs:[]
        };
    } //end of constructor
    
        async componentDidMount(){
          console.log("User logged in to company: ", this.state.companyId)
          let f = fetch('/company/'+this.state.companyId+'/employee/'+1+'?treeDepth='+this.state.defaultTreeDepth)
                  .then(response=>{console.log(response)
                                    return response.json()})
                  .then(json=>{console.log("passing data: ",json);console.log(initializeTree(json));return (initializeTree(json))})
          f.then(data=>{this.setState({didTreeChange:true});this.setState({tree:data});})

          const response = await fetch('/company/'+this.state.companyId+'/search/firstName?q=');
          const json = await response.json();
          //console.log(json.results)
          this.setState(state => {
            for (const [index] of json.results.entries()) {
              this.state.autoFirst.push({ value: json.results[index].firstName })
              this.state.autoLast.push({ value: json.results[index].lastName })
              this.state.autoOption.push({ value: json.results[index].firstName })        
              if (json.results[index].isManager == true)
                this.state.managerList.push({ value: json.results[index].firstName + ' ' + json.results[index].lastName })
              else
                this.state.employeeList.push({ value: json.results[index].firstName + ' ' + json.results[index].lastName })
            }
          });
          //console.log('this.state.managerList ')
          //console.log(this.state.managerList)
        }

        checkIfTreeChanged(){
          if(this.state.tree){

          }
          return this.state.didTreeChange
        }

        onManageChange = (value) => {
          console.log(`selected ${value}`);  }
        
        onManageBlur() {

          console.log('blur');  }
        
        onManageFocus() {
          console.log('focus');  }
        
        onManageSearch = (val) => {
          console.log('search:', val);  }
        
        openNotification() {
            console.log("this is notif")
            notification.open({
              key,
              message: 'Notification Title',
              description: 'description.',
            });    setTimeout(() => {
              notification.open({
                key,
                message: 'New Title',
                description: 'New description.',
              });
            }, 1000);
          };
      
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
        
        handleDownload = () => {
          this.setState({ downloadingChart: false })
        }
        handleSearchparamChange = (searchparam) =>{
          const sp = searchparam
          this.setState({searchparam: sp})
          console.log(`selected ${sp}`);
          if (searchparam === 'First') {
            this.setState({ autoOption: this.state.autoFirst })
          } else if (searchparam === 'Last') {
            this.setState({ autoOption: this.state.autoLast })
          } else if (searchparam === 'EmplID') {
            this.setState({ autoOption: this.state.autoEmpty })
          }
        };

        transEmp(modal5Visible) {
          this.setState({ modal5Visible });
        }

        handleOnChangeConfig = config => {
          this.setState({ config: config })
        }
      
        handleLoadConfig = () => {
          const { config } = this.state
          return config
        }

        addEmp(modal1Visible) {
          this.setState({ modal1Visible });
        }
      
        dropEmp(modal2Visible) {
          this.setState({ modal2Visible });
        }
        editEmp(modal3Visible) {
          this.setState({ modal3Visible });
          this.setState({
              firstNameTemp: this.state.firstName,lastNameTemp: this.state.lastName,companyIdTemp: this.state.companyId,
              passwordTemp: this.state.password,positionTitleTemp: this.state.positionTitle,companyNameTemp: this.state.companyName,
              isManagerTemp: this.state.isManager,employeeIdTemp:this.state.employeeId,emailTemp: this.state.email,startDateTemp: this.state.startDate,
          });
        }

        importjson(modal4Visible)
        {
          this.setState({ modal4Visible });
        }


        handleSearch = (emplID) => {
          console.log('searching by: ', this.state.searchparam)
          if(this.state.searchparam==='EmplID')
          {
            console.log('searching by: ', this.state.searchparam)
            let resp = fetch('/company/'+this.state.companyId+'/employee/' + emplID)
          
            //let resp = fetch('/naivelogin/'+emplID)//company/3/employee/1')
                            .then(response => {return response.json()})
                            .then(json =>
                              {
                                this.setState({
                                firstName : json.firstName,lastName : json.lastName,companyId : json.companyId,
                                password : json.password,positionTitle : json.positionTitle,companyName : json.companyName,
                                isManager : json.isManager,employeeId : json.employeeId,email : json.email,startDate : json.startDate})
                              })
            this.setState({tree:null})
            let resp2 = fetch('/company/'+this.state.companyId+'/employee/'+emplID+'?treeDepth='+this.state.defaultTreeDepth)
                        .then(response => {console.log("Response code in search:", response.status);  return response.json()})
                        .then(json=>{this.setState({getChartfromRoot: json.employeeId,didTreeChange: true,tree:handleFetchedTree(json)});})
              }


          if(this.state.searchparam==='First')
          {
            this.setState({tree:null})
            console.log('searching by: ', this.state.searchparam)
            let resp = fetch('/company/'+this.state.companyId+'/search/firstName?q=' + emplID)
            //let resp = fetch('/naivelogin/'+emplID)//company/3/employee/1')
                            .then(response => { return response.json()})
                            .then(json =>
                                    {
                                      this.setState({firstName : json.results[0].firstName,lastName : json.results[0].lastName,companyId : json.results[0].companyId,
                                      password : json.results[0].password,positionTitle : json.results[0].positionTitle,companyName : json.results[0].companyName,
                                      isManager : json.results[0].isManager, employeeId : json.results[0].employeeId, email : json.results[0].email, startDate : json.results[0].startDate})
                                      fetch('/company/'+this.state.companyId+'/employee/'+json.results[0].employeeId+'?treeDepth='+this.state.defaultTreeDepth).then(response2=>response2.json()).then(json2=>{this.setState({tree:handleFetchedTree(json2)})})
                                    }
                                    
                                  );
          }

          if(this.state.searchparam==='Last')
          {
            console.log("Searching by lastname")
              let holdstate = this.state.tree;
              this.setState({tree:null})
              console.log('searching by: ', this.state.searchparam)
              let resp = 
                fetch('/company/'+this.state.companyId+'/search/lastName?q=' + emplID)
                .then(response => {console.log("response", response);return response.json()})
                .then(json =>
                  {
                    this.setState({ firstName : json.results[0].firstName,lastName : json.results[0].lastName,companyId : json.results[0].companyId,
                    password : json.results[0].password, positionTitle : json.results[0].positionTitle,companyName : json.results[0].companyName,isManager : json.results[0].isManager,
                    employeeId : json.results[0].employeeId,email : json.results[0].email, startDate : json.results[0].startDate})
                    fetch('/company/'+this.state.companyId+'/employee/'+json.results[0].employeeId+'?treeDepth='+this.state.defaultTreeDepth).then(response2=>response2.json()).then(json2=>{this.setState({tree:handleFetchedTree(json2)})})
                  })
                }
        }                   

        depthChange = (value) =>{
          if(!Number.isInteger(value)){
            console.log("not an integer")
            return;
          }
          console.log("depthchange: ", value)
          let temp = this.state.tree;
          this.setState({tree:null})
          this.setState({defaultTreeDepth: value})    
          console.log("ID", temp.id)
          let resp = fetch('/company/'+this.state.companyId+'/employee/' + temp.id+'?treeDepth='+value)
            //let resp = fetch('/naivelogin/'+emplID)//company/3/employee/1')
                            .then(response => {return response.json()})
                            .then(json =>{this.setState({tree:handleFetchedTree(json)})})
        }


        handleLogout = () => {
          removeUserSession();
          this.props.history.push('/login');
        }

        render() {
          //console.log("Tree state at render:", this.state.tree)
          if(this.state.tree===null)
            return (<p1 className="loading">Loading...</p1>);
          else
          return (
            <Layout style={{ minHeight: '100vh' }}>

              <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} theme="dark">

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                  <Menu.Item key="2" onClick={this.view}  icon={<DesktopOutlined />}>View</Menu.Item>
                  <SubMenu key="sub1" icon={<UserOutlined />} title="Manage">
                  <Menu.Item key="3"onClick={()=>this.addEmp(true)}> add </Menu.Item> 
                   
                   <Modal title="Add Employee" style={{ top: 20 }} visible={this.state.modal1Visible} onOk={() => this.addEmp(false)} onCancel={() => this.addEmp(false)}>
                  <Form {...layout} name="nest-messages" onFinish={this.onFinish} >
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
                  <Menu.Item key="8" icon={<FundViewOutlined />} onClick={() => this.transEmp(true)}>Transfer</Menu.Item>
            <Modal
              title="Transfer Employee"
              style={{ top: 20 }}
              visible={this.state.modal5Visible}
              onCancel={() => this.transEmp(false)}>
              <hr></hr>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="From Manager"
                optionFilterProp="children"
                onChange={value => this.onManageChange(value)}
                onFocus={this.onManageFocus()}
                onBlur={this.onManageBlur()}
                options={this.state.managerList}
                onSearch={value => this.onManageSearch(value)}
                filterOption={(inputValue, option) =>
                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              >
              </Select>
              <span>{'                       '}</span>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="To Manager"
                optionFilterProp="children"
                onChange={value => this.onManageChange(value)}
                onFocus={this.onManageFocus()}
                onBlur={this.onManageBlur()}
                options={this.state.managerList}
                onSearch={value => this.onManageSearch(value)}
                filterOption={(inputValue, option) =>
                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              ></Select>              <br />              <br />
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Employee"
                optionFilterProp="children"
                onChange={value => this.onManageChange(value)}
                onFocus={this.onManageFocus()}
                onBlur={this.onManageBlur()}
                options={this.state.employeeList}
                onSearch={value => this.onManageSearch(value)}
                filterOption={(inputValue, option) =>
                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              ></Select>
              <br />              <br />
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Modal>
                              <hr></hr>
                    <Menu.Item key="1" icon={<LogoutOutlined />} >
                      <a href="./login" onClick={this.handleLogout}>logout</a>
                    </Menu.Item>
                </Menu>
              </Sider>

              <Layout className="site-layout">

                  <Header className="site-layout-background" style={{ padding: 0 }} >
                    <div>          

                    <img src={logo} className='img' alt="logo" />
                    <Select className="selectColumn" defaultValue="First" onChange={this.handleSearchparamChange} size="small">
                      <Option value="First" >First Name</Option>
                      <Option value="Last">Last Name</Option>
                      <Option value="EmplID"> Employee ID</Option>
                    </Select>
                    <AutoComplete
                        className="autoSearch2"
                        dropdownClassName="certain-category-search-dropdown"
                        options={this.state.autoOption}
                        filterOption={(inputValue, option) =>
                          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                      >

                        <Search
                          className="autoSearch"
                          placeholder="input search text"
                          enterButton="Search"
                          size="small"
                          onSearch={value => this.handleSearch(value)}
                        />
                      </AutoComplete>    
                      
                      <Badge count={5} className="badge" size="small" />          
                      <BellOutlined className="noti" type="primary" onClick={() => this.openNotification()}>
                        Notification
                      </BellOutlined>
                        <h1>
                          {this.state.firstName} {this.state.lastName}
                        </h1>
                    </div>

                  </Header>




                  <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    
                    </Breadcrumb>
                    
                    <DisplayTree treeR={this.state.tree}/>

                  </Content>

                  <div className="numpicker">
                        Depth 
                  <InputNumber  min={1} max={50} defaultValue={this.state.defaultTreeDepth} 
                    onChange={this.depthChange} />
                  </div>

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