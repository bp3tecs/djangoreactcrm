
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

import { getAccount,
         //loading,
         //deleteAccount,
        //  refresh,
         //responseMessage 
        } from '../../redux/actions/Accounts'

import { momentTimeFormats } from '../../Utilities'
import './accounts.css'
import { service } from '../../service'
const { TabPane } = Tabs

export const AccountsList = (props) => {    
  
  const { accountsData, refresh } = props
     
      //sconsole.log(props)
  const [key, setKey] = useState(1)  
  const [isList, setIsList] = useState(true)
  const [openPage, setOpenPage] = useState(1)
  const [closePage, setClosePage] = useState(1)  

  const colors = ['#1e90ff', '#ff3377', '#ff8000', '#00b300']    
  
  

  useEffect(() => {              
    props.getAccount('/api/accounts/')
    //props.getLeads('api/leads/', 0)
    //console.log(props)
    console.log('Accounts in use Effect') 
    console.log(accountsData)
  }, [])
  console.log('Accounts in use Effect After')   
  console.log(accountsData)   
  
          

  

  return (    
    <div className='Accountslist'>
    <div className='Accounts-toolbar'>
      <div className='Accounts-toolbar-functions-wrapper'>
        
        <FilterOutlined />
        <span className='Accounts-toolbar-pagination'>
          <LeftOutlined />
          <span className='Accounts-toolbar-pagination-numbers'>
            {
              (key == 1)
              ? `${openPage} of ${Math.ceil((accountsData?.open_Accounts?.Accounts_count)/accountsData?.per_page)}`
              : `${closePage} of ${Math.ceil((accountsData?.close_Accounts?.Accounts_count)/accountsData?.per_page)}`
            }
          </span>
          <RightOutlined  />
        </span>            
        <Button
          type='primary'
          className='btn text-white fw-12 fw-6'
        >
          <PlusOutlined />
          <span onClick={() =>  props.history.push('/home/Accounts/new')}>Add Account</span>
        </Button>        
      </div>
    </div>   
    <>
       
        <div className='list-table'>
         
            <Tabs  type='card'>
          <TabPane tab='Open' key='1'>  
          <div className='list-table-scroller'>
            <List
                dataSource={accountsData?.active_accounts?.open_accounts}
                renderItem={
                  item => (
                    <List.Item>
                      <Row gutter={16} justify='space-between' align='bottom' style={{width: '100vw'}}>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>                    
                          <p className='Accountslist-listitem-title'>{item.name}</p>
                          <p className='Accountslist-listitem-info'>
                            {item.email}
                            
                               
                          </p>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>                          
                          <div className='Accountslist-listitem-info-two'>
                            <p className='Accountslist-listitem-delete'><DeleteOutlined onClick={() => AccountDelete(item.id)}/></p>
                            <p className='Accountslist-listitem-createdby'>                        
                              <span>Created {momentTimeFormats(item.created_on)[0]} by </span>
                              <span><Avatar src={item.created_by.user_details.profile_pic}></Avatar></span>
                              <span className='text-capitalize'>{item.created_by.user_details.first_name}</span>                              
                            </p>
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
                dataSource={accountsData?.close_Accounts?.close_Accounts}
                renderItem={
                  item => (
                    <List.Item>
                      <Row gutter={16} justify='space-between' align='bottom' style={{width: '100vw'}}>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>                    
                          <p className='Accountslist-listitem-title'>{item.title}</p>
                          <p className='Accountslist-listitem-info'>
                            {item.country ? item.country : 'N/A '} 
                            - Source <b className='Accountslist-listitem-info-source text-capitalize'>{item.source ? item.source: 'N/A' } </b>
                            - Status <b className='Accountslist-listitem-info-status text-capitalize'>{item.status ? item.status: 'N/A' } </b>
                            <span className='Accountlist-tags-wrapper'>
                            {
                              item.tags.map((tag,i) => {                          
                                return (
                                <Tag
                              color={colors[Math.floor(Math.random()*4)]} 
                              className='Accountlist-tag'
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
                              <p className='Accountslist-listitem-delete'><DeleteOutlined /></p>
                              <p className='Accountslist-listitem-createdby'>                        
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
    accountsData, 
    //openOffset, closeOffset, 
    //refresh 4
  } = state.accounts
  return { 
    //isLoading,
     accountsData,
     // openOffset, closeOffset, refresh
     }
}

const mapDispatchToProps = {
  getAccount,
  //loading,
  //deleteAccount,
  // refresh,
  //responseMessage  
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsList)
//