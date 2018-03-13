import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form as SemanticForm, Header, Icon } from 'semantic-ui-react';
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

class Finalize extends React.Component {
  onSubmit = () => {
    this.props.next();
  };

  render() {
    const { handleSubmit, submitting, invalid, bracketId } = this.props;

    if (!bracketId) return null;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <FormFieldsContainer>
          <div>
            <FormHeader sub>Bracket Id</FormHeader>
            <SemanticForm.Field>
              <SemanticForm.Input
                style={{ minWidth: '20rem', marginBottom: 10 }}
                type="text"
                placeholder="Bracket Id"
                value={bracketId}
              />
            </SemanticForm.Field>
          </div>

          <ButtonsContainer>
            <Button animated type="button" onClick={() => this.props.back()}>
              <Button.Content visible>Back</Button.Content>
              <Button.Content hidden>
                <Icon name="left arrow" />
              </Button.Content>
            </Button>

            <Button animated disabled={submitting || invalid}>
              <Button.Content visible>Next</Button.Content>
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

export default connect(state => ({ bracketId: state.createBracket.id }))(
  reduxForm({ form: 'finalize', destroyOnUnmount: false })(Finalize)
);
