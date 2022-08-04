
import { React, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Tabs, List, Row, Col, 
         Tag, Avatar, Button, 
         Spin} from 'antd'
import { DeleteOutlined, 
         UnorderedListOutlined, 
         FilterOutlined, 
         AppstoreOutlined,                  
         PlusOutlined,
         RightOutlined, 
         LeftOutlined } from '@ant-design/icons'

import  {getLeads} from '../../redux/actions/Leads' 

import { 
        getTest_module,
        loading,
         
        refresh,
         responseMessage 
        } from '../../redux/actions/Test_module'
import { deleteTest_module } from '../../redux/actions/Test_module'

import { momentTimeFormats } from '../../Utilities'
import './test_module.css'
import { service } from '../../service'
const { TabPane } = Tabs

export const test_moduleList = (props) => {    
  
  const { test_moduleData, refresh } = props
  console.log(props)
      //sconsole.log(props)
  const [key, setKey] = useState(1)  
  const [isList, setIsList] = useState(true)
  const [openPage, setOpenPage] = useState(1)
  const [closePage, setClosePage] = useState(1)  

  const colors = ['#1e90ff', '#ff3377', '#ff8000', '#00b300']    
  
  

  useEffect(() => {              
    props.getTest_module('/api/test_module/')
    //props.getLeads('api/leads/', 0)
    //console.log(props)
    console.log('Test_modules in use Effect') 
    console.log(test_moduleData)
  }, [])
  console.log('Test_modules in use Effect After')   
  console.log(test_moduleData)   
  
          

  const test_moduleDelete = (id) => { 
    console.log('delete')       
    props.deleteTest_module(id,!refresh)
    alert("Test_module Deleted Successfully")
    props.getTest_module('/api/test_module/')
  }

  return (    
    <div className='test_modulelist'>
    <div className='test_module-toolbar'>
      <div className='test_module-toolbar-functions-wrapper'>
        
        <FilterOutlined />
        <span className='test_module-toolbar-pagination'>
          <LeftOutlined />
          <span className='test_module-toolbar-pagination-numbers'>
            {
              (key == 1)
              ? `${openPage} of ${Math.ceil((test_moduleData?.open_test_module?.test_module_count)/test_moduleData?.per_page)}`
              : `${closePage} of ${Math.ceil((test_moduleData?.close_test_module?.test_module_count)/test_moduleData?.per_page)}`
            }
          </span>
          <RightOutlined  />
        </span>            
        <Button
          type='primary'
          className='btn text-white fw-12 fw-6'
        >
          <PlusOutlined />
          <span onClick={() =>  props.history.push('/home/test_module/new')}>Add test_module</span>
        </Button>        
      </div>
    </div>   
    <>
       
        <div className='list-table'>
         
            <Tabs  type='card'>
          <TabPane tab='Open' key='1'>  
          <div className='list-table-scroller'>
            <List
                dataSource={test_moduleData?.test_module_obj_list}
                renderItem={
                  item => (
                    <List.Item>
                      <Row gutter={16} justify='space-between' align='bottom' style={{width: '100vw'}}>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>                    
                          <p className='test_modulelist-listitem-title'>{item.name}</p>
                          <p className='test_modulelist-listitem-info'>
                            {item.mobilenumber}
                            
                               
                          </p>
                          <p className='test_modulelist-listitem-info'>
                            {item.title}
                            
                               
                          </p>
                          <p className='test_modulelist-listitem-info'>
                            {item.contact.first_name}
                            
                               
                          </p>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>                          
                          <div className='test_modulelist-listitem-info-two'>
                            
                            </div>
                        </Col>              
                    </Row>                
                </List.Item>
                  )
                            }>
            </List>  
          </div>                                   
          </TabPane>
          <TabPane tab='Close' key='2'>
          <List
                dataSource={test_moduleData?.close_test_module?.close_test_module}
                renderItem={
                  item => (
                    <List.Item>
                      <Row gutter={16} justify='space-between' align='bottom' style={{width: '100vw'}}>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>                    
                          <p className='test_modulelist-listitem-title'>{item.title}</p>
                          <p className='test_modulelist-listitem-info'>
                            {item.country ? item.country : 'N/A '} 
                            - Source <b className='test_modulelist-listitem-info-source text-capitalize'>{item.source ? item.source: 'N/A' } </b>
                            - Status <b className='test_modulelist-listitem-info-status text-capitalize'>{item.status ? item.status: 'N/A' } </b>
                            <span className='test_modulelist-tags-wrapper'>
                            {
                              item.tags.map((tag,i) => {                          
                                return (
                                <Tag
                              color={colors[Math.floor(Math.random()*4)]} 
                              className='test_modulelist-tag'
                                >
                              {tag.name}
                                </Tag>
                              )})
                            }
                          </span>
                          <span>                            
                            {
                              item.assigned_to.map((user, index) => {                              
                                return (
                                  (user.user_details.profile_pic !== null)
                                    ? <Avatar src={user.user_details.profile_pic}></Avatar>
                                    : <Avatar 
                                        style={{color: '#fff', backgroundColor: `${colors[Math.floor(Math.random()*4)]}`}}
                                      >
                                        <span className='text-capitalize' title={user.user_details.first_name}>{user.user_details.first_name.toString()[0]}</span>
                                      </Avatar>
                                    )
                                })
                              }
                          </span>
                          </p>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                          <Row justify="start" align="bottom">
                            <Col>
                              <p className='test_modulelist-listitem-delete'><DeleteOutlined /></p>
                              <p className='test_modulelist-listitem-createdby'>                        
                                <span>Created {momentTimeFormats(item.created_on)[0]} by </span>
                                <span><Avatar src={item.created_by.user_details.profile_pic}></Avatar></span>
                                <span className='text-capitalize'>{item.created_by.user_details.first_name}</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>              
                    </Row>                
                </List.Item>
                  )
                }>
            </List>                                            
          </TabPane>
            </Tabs> 
           
          
        </div>        
      
    </>    
  </div>     
  )
}

const mapStateToProps = (state) => {
  const { 

    //isLoading, 
    test_moduleData, 
    //openOffset, closeOffset, 
    refresh 
  } = state.test_module
  return { 
    //isLoading,
     test_moduleData,
     // openOffset, closeOffset, 
     refresh
     }
}

const mapDispatchToProps = {
  getTest_module,
  //loading,
  deleteTest_module,
  refresh,
  responseMessage  
}

export default connect(mapStateToProps, mapDispatchToProps)(test_moduleList)
//