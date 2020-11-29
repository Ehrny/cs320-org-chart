import React from 'react';
import ReactDOM from 'react-dom';
import avatarPersonnel from './assets/avatar-personnel.svg'
import OrgChart from '@unicef/react-org-chart'
import { initialTree } from './blanktree';
import { getParent } from './treeparse';
import {tree1} from './Tree'

export class DisplayTree extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tree: this.props.treeR
        }
    }
    onFinish = onFinish => {
        console.log(onFinish);
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
      
    treeChanged = ()=>{

    }
    
    handleDownload = () => {
        this.setState({ downloadingChart: false })
    }
    
    handleSearchparamChange = (searchparam) =>{
        const sp = searchparam
        this.setState({searchparam: sp})
        console.log(`selected ${sp}`);
    };
    
    handleOnChangeConfig = config => {
        this.setState({ config: config })
    }
    
    handleLoadConfig = () => {
        const { config } = this.state
        return config
    }
    render(){
    const { downloadingChart } = this.state
    const tree = this.props.treeR
    //console.log("Prop:", this.props.treeR)
    //For downloading org chart as image or pdf based on id
    const downloadImageId = 'download-image'
    const downloadPdfId = 'download-pdf'
        return (
        <OrgChart tree={(tree!==null)?this.props.treeR:this.state.tree}
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
            downloadedOrgChart={d => {
                this.handleDownload()
            }}
            loadImage={d => {
                return Promise.resolve()
            }}
            loadParent={d => {
                const parentData = getParent(d)
                return parentData
            }}       
        />
        )
    }
}