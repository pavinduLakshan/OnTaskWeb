import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Progress, TabContent, Card, CardBody, Input, Row, Col, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import BasicInfoSettings from './BasicInfoSettings'
import WebPresenceSettings from './WebPresenceSettings'
import ContactInfoSettings from './ContactInfoSettings'
import WorkSettings from './WorkSettings'
import EducationSettings from './EducationSettings'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppSwitch } from '@coreui/react'
import UserProfile from './UserProfile'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      trigger: false,
      editEnabled: false
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  componentDidMount(){
    if(this.props.id === localStorage.getItem('id')){
      this.setState({editEnabled: true})
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props && this.props.id === localStorage.getItem('id')){
      this.setState({editEnabled: true})
    }
  }
  
  triggerUpdate = () => {
    this.setState( prevState => {
      this.setState({trigger: !prevState.trigger})
    })
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                     onClick={() => {
                       this.toggle('1');
                     }}>
              {/* <i className="icon-list"></i> */}
              Profile
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                     onClick={() => {
                       this.toggle('2');
                     }}>
              oooppppp-[pp] <i className="icon-speech"></i> 
              Activity
            </NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink style={{display: this.state.editEnabled ? "block" : "none"}} className={classNames({ active: this.state.activeTab === '3' })}
                     onClick={() => {
                       this.toggle('3');
                     }}>
              {/* <i className="icon-settings"></i> */}
              <p style={{margin: 0}}>Edit Profile & Settings</p>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <UserProfile id={this.props.id} trigger={this.state.trigger}/>
          </TabPane>
          <TabPane tabId="2" className="p-3">
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="" />
                  <span className="avatar-status badge-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Lukasz Holeczek</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt...
              </small>
            </div>
            <hr />
          </TabPane>
          <TabPane tabId="3" className="p-3">
          <Card>
                <CardBody>
                    <BasicInfoSettings id={localStorage.getItem('id')} onUpdate={this.triggerUpdate}/>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                     <ContactInfoSettings  id={localStorage.getItem('id')}/>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <WebPresenceSettings id={localStorage.getItem('id')} onUpdate={this.triggerUpdate}/>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                     <WorkSettings id={localStorage.getItem('id')} onUpdate={this.triggerUpdate}/>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                     <EducationSettings id={localStorage.getItem('id')} onUpdate={this.triggerUpdate}/>
                </CardBody>
            </Card>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
