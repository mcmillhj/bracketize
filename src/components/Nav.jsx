// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Menu, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import { auth } from 'firebaze';

const SquareSegment = styled(Segment)`
  &&& {
    border-radius: 0;
  }
`;

class Nav extends Component<{ authUser: Object | null }, { activeItem: string }> {
  state = {
    activeItem: ''
  };

  componentDidMount() {
    const { location: { pathname } } = this.props;

    pathname && this.handleItemClick(null, { name: pathname.replace('/', '') });
  }

  handleItemClick = (e: Event, { name }: { name: string }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { authUser } = this.props;

    return (
      <SquareSegment inverted>
        <Menu size="large" inverted secondary pointing>
          <Menu.Item as={Link} to="/">
            <Icon name="code" size="large" />
          </Menu.Item>

          {authUser && (
            <Menu.Item
              as={Link}
              to="/brackets"
              name="brackets"
              active={activeItem === 'brackets'}
              onClick={this.handleItemClick}>
              Brackets
            </Menu.Item>
          )}

          {authUser && (
            <Menu.Item
              as={Link}
              to="/create-bracket"
              name="create-bracket"
              active={activeItem === 'create-bracket'}
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
                name="signin"
                active={activeItem === 'signin'}
                onClick={this.handleItemClick}>
                Login
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
      </SquareSegment>
    );
  }
}

export default withRouter(
  connect(state => ({
    authUser: state.auth.authUser
  }))(Nav)
);
