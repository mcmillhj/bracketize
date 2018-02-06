import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

export default class Nav extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted size="large">
        <Menu.Item as={Link} to="/">
          <Icon name="code" size="large" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/brackets"
          name="Brackets"
          active={activeItem === 'Brackets'}
          onClick={this.handleItemClick}>
          Brackets
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/create-bracket"
          name="Create New Bracket"
          active={activeItem === 'Create New Bracket'}
          onClick={this.handleItemClick}>
          New Bracket
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/login" name="login" active={activeItem === 'login'} onClick={this.handleItemClick}>
            Login / Sign Up
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
