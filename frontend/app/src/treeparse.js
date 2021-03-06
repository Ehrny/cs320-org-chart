import React from 'react'
import { tree, tree1, tree2, tree3, tree4, tree5 } from './Tree'
import avatarPersonnel from './assets/avatar-personnel.svg'
import { map } from 'd3';
import axios from 'axios';

const url = 'http://161.35.55.104/api'
const TreeArr = [];   //Split the nested tree into array of subtrees for rendering
const splitTrees = [];

export const initializeTree = (boss) => {
  return translate(boss)
}


export const getChildren = (rootId, depth) =>{ //rootId parameter is employee ID of type int
 // console.log("rootId in getchildren", rootId)
 // console.log("Tree contains: ", TreeArr);
  let temptree = [];
  let curr = {};

    for(let x = 0;x<TreeArr.length;x++)
      if(TreeArr[x].id===rootId)
        curr = TreeArr[x];
   // console.log("curr: ", curr);
    if(curr.children.length>0){
      for(let i = 0; i < TreeArr.length;i++){
        if(curr.children!==null && curr.children.includes(TreeArr[i].id))
        {  
          temptree.push(TreeArr[i]);
        }
      }
     // console.log("Get child returns: ", temptree)
      return temptree;
    }
    else
      return console.log('no children')
}

export const myGetChild = (node) =>{
    return {}
}
export async function getParent  (d) {
  let response = await (fetch(url+"company/"+d.cid+"/employee/"+d.id+"/manager?treeDepth="+3))
  let js = await response.json()
  let tr = await  translate(js)
    return tr
  }


export const getNode = (rootId) =>
{
  if(TreeArr.length>0)
  {
    for(let i=0;i<TreeArr.length;i++){
      if(TreeArr[i]===rootId)
        return TreeArr[i];
    }
  }
  console.log("Tree not populated yet");
  return {}
}

const parseChildren = (obj) =>{
  let temp=[]
  if(obj.employees===null)
      return [];
  else{
      for(let x=0;x<obj.employees.length;x++)
          temp.push(translate(obj.employees[x]))
  }
  return temp
}

export const translate = (obj) =>{
  let id=0,avatar=null, department='', name='', title='', totalReports=0, 
  person={}, this_hasChild=(obj.employees===null)?false:true, this_hasParent= (obj.employeeId===1)?false:true, 
  rchildren=[]; let this_employees = [];
  if((obj.employees)===null) this_employees=0
  else this_employees=obj.employees.length 
  //console.log('translating: ', obj.employeeId, ' is array test: ',  Array.isArray(obj.employees));
    let exporting = {
      id: obj.employeeId,
      cid: obj.companyId,
      person: {
        id: obj.employeeId,
        avatar: avatarPersonnel,
        department: '',
        name: obj.firstName+' '+obj.lastName,
        title: obj.positionTitle,
        totalReports: this_employees,
      },
      hasChild: this_hasChild,
      hasParent: this_hasParent,
      children: parseChildren(obj),
    }
    return exporting;
}


function checkIfIdExists(id, arr)
{
  for(let x=0;x<arr.length;x++)
    if(arr[x].id===id)
      return true;
  return false;
}


export const handleFetchedTree = (json) =>{  //returns on search
  console.log("on search tree returned:", translate(json));
  return translate(json);
}