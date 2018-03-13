// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, Icon, Menu, Responsive } from 'semantic-ui-react';
import styled from 'styled-components';

import { auth } from 'firebaze';

const SquareMenu = styled(Menu)`
  &&& {
    border-radius: 0;
  }
`;

const leftItems = [
  {
    key: 'brackets',
    to: '/brackets',
    name: 'brackets',
    requiresAuth: true,
    active: activeItem => /brackets/.test(activeItem)
  },
  {
    key: 'create-bracket',
    to: '/create-bracket',
    name: 'create-bracket',
    requiresAuth: true,
    active: activeItem => /create-bracket/.test(activeItem)
  }
];

const rightItems = [
  {
    key: 'account',
    to: '/account',
    name: 'account',
    requiresAuth: true,
    active: activeItem => /account/.test(activeItem)
  },
  {
    key: 'signout',
    to: '/',
    name: 'signout',
    onClick: auth.doSignOut,
    requiresAuth: true,
    active: activeItem => /signout/.test(activeItem)
  },
  {
    key: 'signin',
    to: '/signin',
    name: 'signin',
    requiresAuth: false,
    active: activeItem => /signin/.test(activeItem)
  }
];

const NavMobile = ({ leftItems, onToggle, onItemClick, rightItems, authUser, activeItem, visible }) => (
  <SquareMenu borderless inverted>
    <Dropdown icon={<Icon size="large" name="bars" />} onClick={onToggle} simple={visible} item>
      <Menu stackable>
        {leftItems
          .filter(item => !!authUser === item.requiresAuth)
          .map(item => (
            <Menu.Item
              key={item.key}
              to={item.to}
              as={Link}
              name={item.name}
              onClick={item.onClick || onItemClick}
              active={item.active(activeItem)}
            />
          ))}
      </Menu>
    </Dropdown>
    <Menu.Menu position="right">
      {rightItems
        .filter(item => !!authUser === item.requiresAuth)
        .map(item => (
          <Menu.Item
            key={item.key}
            to={item.to}
            as={Link}
            name={item.name}
            onClick={item.onClick || onItemClick}
            active={item.active(activeItem)}
          />
        ))}
    </Menu.Menu>
  </SquareMenu>
);

const NavDesktop = ({ activeItem, authUser, onItemClick, leftItems, rightItems }) => (
  <SquareMenu borderless inverted>
    <Menu.Item as={Link} to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name="home" size="large" />
    </Menu.Item>
    {leftItems
      .filter(item => !!authUser === item.requiresAuth)
      .map(item => (
        <Menu.Item
          key={item.key}
          to={item.to}
          as={Link}
          name={item.name}
          onClick={item.onClick || onItemClick}
          active={item.active(activeItem)}
        />
      ))}
    <Menu.Menu position="right">
      {rightItems
        .filter(item => !!authUser === item.requiresAuth)
        .map(item => (
          <Menu.Item
            key={item.key}
            to={item.to}
            as={Link}
            name={item.name}
            onClick={item.onClick || onItemClick}
            active={item.active(activeItem)}
          />
        ))}
    </Menu.Menu>
  </SquareMenu>
);

class NavBar extends Component<
  { children: any, authUser: Object, leftItems: Array<Object>, rightItems: Array<Object>, location: Object },
  { activeItem: string, visible: boolean }
> {
  state = {
    visible: false,
    activeItem: ''
  };

  componentDidMount() {
    const { location: { pathname } } = this.props;

    pathname && this.handleItemClick(null, { name: pathname.replace('/', '') });
  }

  componentDidUpdate() {
    const { location: { pathname } } = this.props;
    const { activeItem } = this.state;

    pathname &&
      activeItem !== pathname.replace('/', '') &&
      this.handleItemClick(null, { name: pathname.replace('/', '') });
  }

  handleItemClick = (_, { name }: { name: string }) => {
    const { activeItem } = this.state;

    activeItem !== name && this.setState({ activeItem: name });
  };

  hangleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { authUser } = this.props;
    const { activeItem, visible } = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavMobile
            leftItems={leftItems}
            rightItems={rightItems}
            authUser={authUser}
            onItemClick={this.handleItemClick}
            activeItem={activeItem}
            onToggle={this.hangleToggle}
            visible={visible}
          />
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavDesktop
            leftItems={leftItems}
            rightItems={rightItems}
            authUser={authUser}
            onItemClick={this.handleItemClick}
            activeItem={activeItem}
          />
        </Responsive>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({
    authUser: state.auth.authUser
  }))(NavBar)
);
