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

class Nav extends Component<{ authUser: Object | null, location: Object }, { activeItem: string }> {
  state = {
    activeItem: ''
  };

  componentDidMount() {
    const { location: { pathname } } = this.props;
    pathname && this.handleItemClick(null, { name: pathname.replace('/', '') });
  }

  handleItemClick = (_, { name }: { name: string }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { authUser } = this.props;

    return (
      <SquareSegment inverted>
        <Menu size="large" inverted secondary pointing>
          <Menu.Item as={Link} to="/">
            <Icon name="code" size="large" />
          </Menu.Item>

          {authUser && [
            <Menu.Item
              key="brackets"
              as={Link}
              to="/brackets"
              name="brackets"
              active={/brackets/.test(activeItem)}
              onClick={this.handleItemClick}>
              Brackets
            </Menu.Item>,
            <Menu.Item
              key="create-bracket"
              as={Link}
              to="/create-bracket"
              name="create-bracket"
              active={/create-bracket/.test(activeItem)}
              onClick={this.handleItemClick}>
              New Bracket
            </Menu.Item>
          ]}

          <Menu.Menu position="right">
            {authUser ? (
              [
                <Menu.Item
                  key="account"
                  as={Link}
                  to="/account"
                  name="account"
                  active={/account/.test(activeItem)}
                  onClick={this.handleItemClick}>
                  Account
                </Menu.Item>,
                <Menu.Item
                  key="signout"
                  as={Link}
                  to="/"
                  name="signout"
                  active={/signout/.test(activeItem)}
                  onClick={auth.doSignOut}>
                  Sign Out
                </Menu.Item>
              ]
            ) : (
              <Menu.Item
                as={Link}
                to="/signin"
                name="signin"
                active={/signin/.test(activeItem)}
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
