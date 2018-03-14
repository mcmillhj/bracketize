// @flow

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form, Header, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const ButtonsContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${10 / 16}rem 0;
`;

const FormFieldsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormHeader = styled(Header)`
  &&& {
    margin-top: 0;
  }
`;

class Finalize extends React.Component<{ history: Object, bracketId: number, next: Function }> {
  onSubmit = () => {
    const { history, bracketId } = this.props;

    this.props.next();
    setTimeout(() => history.push(`/brackets/${bracketId}`), 1000);
  };

  render() {
    const { bracketId } = this.props;

    if (!bracketId) return null;

    return (
      <Form onSubmit={this.onSubmit}>
        <FormFieldsContainer>
          <FormHeader sub>
            Congratulations, your bracket has been created. Share the link below to start voting on Round 1
          </FormHeader>
          <Form.Field>
            <Form.Input
              style={{ minWidth: '30rem', marginBottom: 10, marginTop: 10 }}
              type="text"
              placeholder="Bracket Id"
              value={`${window.location.origin}/brackets/${bracketId}`}
            />
          </Form.Field>

          <ButtonsContainer>
            <Button animated>
              <Button.Content visible>View Bracket</Button.Content>
              <Button.Content hidden>
                <Icon name="right arrow" />
              </Button.Content>
            </Button>
          </ButtonsContainer>
        </FormFieldsContainer>
      </Form>
    );
  }
}

export default withRouter(connect(state => ({ bracketId: state.createBracket.id }))(Finalize));
