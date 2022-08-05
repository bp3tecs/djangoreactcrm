import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Collapse, Row, Col, 
         Input, Menu, Select, 
         Breadcrumb,DatePicker, Button, Upload } from 'antd'
import { PlusOutlined, 
         VerticalAlignTopOutlined, 
         LeftOutlined,
         CheckOutlined,
         CloseCircleOutlined } from '@ant-design/icons'
import Address from '../../components/ui-components/Address'
import Description from '../../components/ui-components/Description'
import { addContact } from '../../redux/actions/Contacts'
import { getProfiles } from '../../redux/actions/Profiles'
import ReactQuill from 'react-quill';
import { rules } from '../common/rules'
import { modules, formats } from '../common/quillConfig'
import { layout } from '../common/layout'
//import { ContactDrawer } from './components/ContactDrawer'
import './contacts.css'

const { Panel } = Collapse
const { Option } = Select

export const AddContact = (props) => {  
  
  /*useEffect(() => {
    props.getProfiles()
  }, [])*/

  const { responseMessage, errors, profiles } = props

  
  const currencyList = (
    <Select defaultValue='INR'>
      <Option value='CAD'>CAD</Option>
      <Option value='USD'>USD</Option>
    </Select>
  )  

  const [contactDrawer, setContactDrawer] = useState(false)

  const displayContactDrawer = () => {
    setContactDrawer(true)
  }

  const addContact = (e) => { 
    console.log('hello') 
    console.log(e)  
    props.addContact(e) 
    //alert('Contact Saved Successfully.Press Back to Contacts button')
    //props.history.push('/home/contacts')   
  }
  console.log(responseMessage)  
  useEffect(() => {        
    if(responseMessage === true) {
      props.history.push('/home/contacts')
      alert('Contact Saved Successfully')
    }
  }, [responseMessage])

  return (
    <div className='add-contact'>
      <Row className="contacts-toolbar">
        <Breadcrumb className='contacts-toolbar-breadcrumb'>
          <Breadcrumb.Item>
            <Link to='/home'>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/home/contacts'>Contacts</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/home/contacts/new'>Add Contact</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row className='contacts-toolbar-buttons'>
        <Button 
          type='primary'
          className='btn fw-12 fw-6'
        >
          <LeftOutlined />
          <span onClick={() =>  props.history.push('/home/contacts')}>Back To Contacts</span>
        </Button>
                  
        </Row>
      </Row>
        <div className='add-contact-form'>
          <Form
            {...layout}
            onFinish={addContact}
            style={{background: '#fff', padding: '20px'}}
          >
            <Collapse expandIconPosition='right' defaultActiveKey={[1]}>
              <Panel header='Contacts Details' key='1'>
                <Row justify='start'>
                  <Col xs={24} sm={24} md={24} lg={12} xl={11}>
                  <Form.Item label="Saluation" name="salutation" className="saluation"
                     >
                      <Input  /> 
                   </Form.Item>
                   <Form.Item label="Last Name" name="last_name" className="lastname">
                   <Input  />
                   </Form.Item>
                   <Form.Item label="Organization" name="organization" className="organization">
                     <Input className="" suffix={<PlusOutlined />}/>
                   </Form.Item>
                   <Form.Item label="Primary Email" name="primary_email" className="primaryemail">
                   <Input className='required' />
                   </Form.Item>
                   <Form.Item label="Secondary Number" name="secondary_number" className="secondarynumber">
                     <Input/>
                   </Form.Item>
                   <Form.Item label="Department" name="department" className="department">
                     <Select>
                       <Option value="deptone">Department One</Option>
                       <Option value="depttwo">Department Two</Option>
                       <Option value="deptthree">Department</Option>
                     </Select>
                   </Form.Item>
                   
                 </Col>
                 <Col span={12}>
                   <Form.Item label="First Name" name="first_name" className="firstname" 
                     
                   >
                      <Input className='required' />
                   </Form.Item>
                   
                   <Form.Item label="Title" name="title" className="title"
                    
                   >
                      <Input  />
                   </Form.Item>
                   <Form.Item label="Secondary Email" name="secondaryemail" className="secondaryemail">
                     <Input className=""/>
                   </Form.Item>
                   <Form.Item label="Mobile Number" name="mobile_number" className="mobilenumber">
                     <Input className=""/>
                   </Form.Item>
                   <Form.Item label="Language" name="language" className="language">
                     <Input className=""/>
                   </Form.Item>
                 </Col>                
               </Row>                                   
           </Panel>
         </Collapse>

        
         <Collapse defaultActiveKey={["1"]} expandIconPosition="right" className="mt-4">
           <Panel header="Address Details" key="1">
             <Address               
               errors={rules.addressLane}/>
           </Panel>
         </Collapse>        

        
         <Collapse defaultActiveKey={["1"]} expandIconPosition="right" className="mt-4">
           <Panel header="Description" key="1">
             <Description />
           </Panel>
         </Collapse>

        
         <Collapse defaultActiveKey={["1"]} expandIconPosition="right" className="mt-4">
           <Panel header="Socials" key="1">            
               <Row>
                 <Col span={12}>
                   <Form.Item label="Linkedin URL" name="linked_in_url" className="linkedinurl">
                     <Input/>
                   </Form.Item>
                   <Form.Item label="Twitter Handle" name="twitter_username" className="twitterhandle">
                     <Input/>
                   </Form.Item>
                 </Col>
                 <Col span={12}>
                   <Form.Item label="facebook URL" name="facebook_url" className="facebookurl">
                     <Input/>
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
  const { responseMessage, errors } = state.contacts
  //const { profiles } = state.profiles
  return { responseMessage, errors
    //profiles 
  }
}

const mapDispatchToProps = {
  addContact,
  //getProfiles
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContact)