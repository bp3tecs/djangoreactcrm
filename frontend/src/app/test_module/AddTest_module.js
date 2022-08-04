import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Collapse, Row, Col, 
         Input, Menu, Select,List, 
         Breadcrumb, Button, Upload } from 'antd'
import { PlusOutlined, 
         VerticalAlignTopOutlined, 
         LeftOutlined,
         CheckOutlined,
         CloseCircleOutlined } from '@ant-design/icons'
import { addTest_module } from '../../redux/actions/Test_module'
import { getProfiles } from '../../redux/actions/Profiles'
import ReactQuill from 'react-quill';
import { rules } from '../common/rules'
import { modules, formats } from '../common/quillConfig'
import { layout } from '../common/layout'
import { getContact } from '../../redux/actions/Contacts'
//import { Test_moduleDrawer } from './components/Test_moduleDrawer'
import './test_module.css'

const { Panel } = Collapse
const { Option } = Select

export const AddTest_module = (props) => {  
  
  
  useEffect(() => {
    props.getContact('/api/contacts/')
    console.log('contacts:'+contactsData)
  }, [])
  
  useEffect(() => {
    props.getProfiles()
  }, [])
  //console.log('contacts:'+contactsData.contact_obj_list)
  const { responseMessage, contactsData,profiles} = props
  
 /* const {obj} = contactsData
  let contactsList =  obj.map((item, i) => {
  return (
    <option key={i} value={item.id}>{item.first_name}</option>
  )
}, this);*/
  console.log(profiles)
  console.log(contactsData)
 const obj = contactsData.contact_obj_list || []
 console.log(obj.length)
 let loopData =[]
for(let i=0; i < obj.length; i++){
  //loopData += obj[i].first_name
  loopData.push(<Option key={obj[i].id}>{obj[i].first_name}</Option>)
}
console.log(loopData)
  const addTest_module = (e) => { 
    console.log('hello') 
    console.log(e)  
    props.addTest_module(e) 
    //alert('Test_module Saved Successfully.Press Back to Test_module button')
    //props.history.push('/home/test_module')   
  }
  console.log(responseMessage)  
  useEffect(() => {        
    if(responseMessage === true) {
      props.history.push('/home/test_module')
      alert('Test_module Saved Successfully')
    }
  }, [responseMessage])

  return (
    <div className='add-test_module'>
      <Row className="test_module-toolbar">
        <Breadcrumb className='test_module-toolbar-breadcrumb'>
          <Breadcrumb.Item>
            <Link to='/home'>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/home/test_module'>Test_module</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/home/test_module/new'>Add Test_module</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row className='test_module-toolbar-buttons'>
        <Button 
          type='primary'
          className='btn fw-12 fw-6'
        >
          <LeftOutlined />
          <span onClick={() =>  props.history.push('/home/test_module')}>Back To Test_module</span>
        </Button>
                  
        </Row>
      </Row>
        <div className='add-test_module-form'>
          <Form
            {...layout}
            onFinish={addTest_module}
            style={{background: '#fff', padding: '20px'}}
          >
            <Collapse expandIconPosition='right' defaultActiveKey={[1]}>
              <Panel header='Test_module Details' key='1'>
                <Row justify='start'>
                  <Col xs={24} sm={24} md={24} lg={12} xl={11}>
                    <Form.Item
                      label='Name'
                      name='name'  
                    >
                    <Input className='required' />
                    </Form.Item>
                    <Form.Item
                      label='Mobile Number'
                      name='mobilenumber'>
                     
                      
                    
                      <Input className='required' />
                    </Form.Item>
                    <Form.Item
                      label='Title'
                      name='title'
                    >
                      <Input className='required'/>
                     
                    </Form.Item>
                    
                    <Form.Item
                      label='Contact'
                      name='contact'
                      className='ant-dropdown-bg'
                    >
                  
                        <Select>

                          {loopData}
                          
                        </Select>  
                    </Form.Item>
                    </Col>                
                </Row>
              </Panel>
             
            </Collapse>

            <Row justify='center' style={{marginTop: '20px', marginBottom: '50px'}}>              

            <Button 
              type='primary'
              className='btn bg-darkblue text-white fw-12 fw-6'                        
            >
              <CloseCircleOutlined />
              <span>Cancel</span>
            </Button>                  
            <Button 
              type='primary'
              className='btn text-white fw-12 fw-6'   
              htmlType='submit'
                         
            >
              <CheckOutlined />
              <span  >Save</span>
            </Button>                  
            </Row>

          </Form>
         
        </div>
      </div>    
  )
}

const mapStateToProps = (state) => {
  const { responseMessage, errors } = state.test_module
  const { contactsData } = state.contacts
  const { profiles } = state.profiles
  return { responseMessage, errors,contactsData,
    profiles 
  }
}

const mapDispatchToProps = {
  addTest_module,
  getProfiles,
  getContact,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTest_module)