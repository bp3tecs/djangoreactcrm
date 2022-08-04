
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
        getContact,
        loading,
         
        refresh,
         responseMessage 
        } from '../../redux/actions/Contacts'
import { deleteContact } from '../../redux/actions/Contacts'

import { momentTimeFormats } from '../../Utilities'
import './contacts.css'
import { service } from '../../service'
const { TabPane } = Tabs

export const contactsList = (props) => {    
  
  const { contactsData, refresh } = props
      
      //sconsole.log(props)
  const [key, setKey] = useState(1)  
  const [isList, setIsList] = useState(true)
  const [openPage, setOpenPage] = useState(1)
  const [closePage, setClosePage] = useState(1)  

  const colors = ['#1e90ff', '#ff3377', '#ff8000', '#00b300']    
  
  

  useEffect(() => {              
    props.getContact('/api/contacts/')
    //props.getLeads('api/leads/', 0)
    //console.log(props)
    console.log('Contacts in use Effect') 
    console.log(contactsData)
  }, [])
  console.log('Contacts in use Effect After')   
  console.log(contactsData)   
  
          

  const contactDelete = (id) => { 
    console.log('delete')       
    props.deleteContact(id,!refresh)
    alert("Contact Deleted Successfully")
    props.getContact('/api/contacts/')
  }

  return (    
    <div className='contactslist'>
    <div className='contacts-toolbar'>
      <div className='contacts-toolbar-functions-wrapper'>
        
        <FilterOutlined />
        <span className='contacts-toolbar-pagination'>
          <LeftOutlined />
          <span className='contacts-toolbar-pagination-numbers'>
            {
              (key == 1)
              ? `${openPage} of ${Math.ceil((contactsData?.open_contacts?.contacts_count)/contactsData?.per_page)}`
              : `${closePage} of ${Math.ceil((contactsData?.close_contacts?.contacts_count)/contactsData?.per_page)}`
            }
          </span>
          <RightOutlined  />
        </span>            
        <Button
          type='primary'
          className='btn text-white fw-12 fw-6'
        >
          <PlusOutlined />
          <span onClick={() =>  props.history.push('/home/contacts/new')}>Add contact</span>
        </Button>        
      </div>
    </div>   
    <>
       
        <div className='list-table'>
         
            <Tabs  type='card'>
          <TabPane tab='Open' key='1'>  
          <div className='list-table-scroller'>
            <List
                dataSource={contactsData?.contact_obj_list}
                renderItem={
                  item => (
                    <List.Item>
                      <Row gutter={16} justify='space-between' align='bottom' style={{width: '100vw'}}>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>                    
                          <p className='contactslist-listitem-title'>{item.contact_first_name}</p>
                          <p className='contactslist-listitem-info'>
                            {item.last_name}
                            
                               
                          </p>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>                          
                          <div className='contactslist-listitem-info-two'>
                            <p className='contactslist-listitem-delete'><DeleteOutlined onClick={() => contactDelete(item.id)}/></p>
                            <p className='contactslist-listitem-createdby'>                        
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
                dataSource={contactsData?.close_contacts?.close_contacts}
                renderItem={
                  item => (
                    <List.Item>
                      <Row gutter={16} justify='space-between' align='bottom' style={{width: '100vw'}}>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>                    
                          <p className='contactslist-listitem-title'>{item.title}</p>
                          <p className='contactslist-listitem-info'>
                            {item.country ? item.country : 'N/A '} 
                            - Source <b className='contactslist-listitem-info-source text-capitalize'>{item.source ? item.source: 'N/A' } </b>
                            - Status <b className='contactslist-listitem-info-status text-capitalize'>{item.status ? item.status: 'N/A' } </b>
                            <span className='contactlist-tags-wrapper'>
                            {
                              item.tags.map((tag,i) => {                          
                                return (
                                <Tag
                              color={colors[Math.floor(Math.random()*4)]} 
                              className='contactlist-tag'
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
                              <p className='contactslist-listitem-delete'><DeleteOutlined /></p>
                              <p className='contactslist-listitem-createdby'>                        
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

    isLoading, 
    contactsData, 
    //openOffset, closeOffset, 
    refresh 
  } = state.contacts
  return { 
    isLoading,
     contactsData,
     // openOffset, closeOffset, 
     refresh
     }
}

const mapDispatchToProps = {
  getContact,
  loading,
  deleteContact,
  refresh,
  responseMessage  
}

export default connect(mapStateToProps, mapDispatchToProps)(contactsList)
//