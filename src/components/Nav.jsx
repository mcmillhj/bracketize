// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Menu, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import { auth } from 'firebaze';

const SquareMenu = styled(Menu)`
  &&& {
    border-radius: 0;
  }
`;

class Nav extends Component<{ authUser: Object | null }, { activeItem: string }> {
  state = {
    activeItem: ''
  };

  handleItemClick = (e: Event, { name }: { name: string }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { authUser } = this.props;

    return (
      <Segment inverted>
        <SquareMenu size="large" inverted secondary pointing>
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
              [
                <Menu.Item
                  key="account"
                  as={Link}
                  to="/account"
                  name="account"
                  active={activeItem === 'account'}
                  onClick={this.handleItemClick}>
                  Account
                </Menu.Item>,
                <Menu.Item
                  key="signout"
                  as={Link}
                  to="/"
                  name="signout"
                  active={activeItem === 'signout'}
                  onClick={auth.doSignOut}>
                  Sign Out
                </Menu.Item>
              ]
            ) : (
              <Menu.Item
                as={Link}
                to="/signin"
                name="login"
                active={activeItem === 'login'}
                onClick={this.handleItemClick}>
                Login
              </Menu.Item>
            )}
          </Menu.Menu>
        </SquareMenu>
      </Segment>
    );
  }
}

export default connect(state => ({
  authUser: state.auth.authUser
}))(Nav);
