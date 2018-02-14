// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

import { auth } from 'storage';

export default class Nav extends Component<{}, { activeItem: string }> {
  state = {
    activeItem: ''
  };

  handleItemClick = (e: Event, { name }: { name: string }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { authUser } = this.context;

    return (
      <Menu inverted size="large">
        <Menu.Item as={Link} to="/">
          <Icon name="code" size="large" />
        </Menu.Item>
        {authUser && (
          <Menu.Item
            as={Link}
            to="/brackets"
            name="Brackets"
            active={activeItem === 'Brackets'}
            onClick={this.handleItemClick}>
            Brackets
          </Menu.Item>
        )}

        {authUser && (
          <Menu.Item
            as={Link}
            to="/create-bracket"
            name="Create New Bracket"
            active={activeItem === 'Create New Bracket'}
            onClick={this.handleItemClick}>
            New Bracket
          </Menu.Item>
        )}

        <Menu.Menu position="right">
          {authUser ? (
            <Menu.Item as={Link} to="/" name="signout" active={activeItem === 'signout'} onClick={auth.doSignOut}>
              Sign Out
            </Menu.Item>
          ) : (
            <Menu.Item
              as={Link}
              to="/signin"
              name="login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}>
              Login / Sign Up
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}

Nav.contextTypes = {
  authUser: PropTypes.object
};
