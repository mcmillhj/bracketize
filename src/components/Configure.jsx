// @flow

import React from 'react';
import type { Node } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form as SemanticForm, Header, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const ErrorText = styled.span`
  display: inline-block;
  font-size: ${12 / 16}rem;
  color: red;
  padding: ${4 / 16}rem;
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

const SemanticFormField = ({
  input,
  type,
  label,
  placeholder,
  meta: { touched, error },
  as: As = SemanticForm.Input,
  ...props
}: {
  input: Object,
  type: string,
  label: string,
  placeholder: string,
  meta: { touched: boolean, error: string },
  as: SemanticForm.Input
}): Node => {
  console.log(input);
  return (
    <SemanticForm.Field>
      <As
        {...input}
        {...props}
        style={{ minWidth: '20rem', marginBottom: 10 }}
        value={type !== 'checkbox' ? input.value : ''}
        type={type}
        label={label}
        placeholder={placeholder}
        onChange={(e, { value, checked }) => (type === 'checkbox' ? input.onChange(checked) : input.onChange(value))}
      />
      {touched &&
        error && (
          <ErrorText>
            <i>{error}</i>
          </ErrorText>
        )}
    </SemanticForm.Field>
  );
};

const required = value => (value ? undefined : 'This is a required field');

class Configure extends React.Component<{
  next: Function,
  back: Function,
  submitting: boolean,
  invalid: boolean,
  handleSubmit: Function
}> {
  onSubmit = () => {
    this.props.next();
  };

  render() {
    const { handleSubmit, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <FormFieldsContainer>
          <div>
            <FormHeader sub>Bracket Name</FormHeader>
            <Field
              required
              name="bracketName"
              type="text"
              placeholder="Bracket Name"
              component={SemanticFormField}
              validate={[required]}
            />
          </div>

          {/* <div>
            <FormHeader sub>
              Allow Nominations <Icon fitted name="question circle outline" />
            </FormHeader>
            <Field
              name="allowNominations"
              type="checkbox"
              component={SemanticFormField}
              as={SemanticForm.Checkbox}
              toggle
            />
          </div> */}

          <div>
            <FormHeader sub>Bracket Size</FormHeader>
            <Field
              required
              name="bracketSize"
              type="select"
              component={SemanticFormField}
              as={SemanticForm.Dropdown}
              placeholder="Bracket Size"
              selection
              options={[
                { key: 4, value: 4, text: '4' },
                { key: 8, value: 8, text: '8' },
                { key: 16, value: 16, text: '16' },
                { key: 32, value: 32, text: '32' }
              ]}
              validate={[required]}
            />
          </div>

          <Button animated disabled={submitting || invalid}>
            <Button.Content visible>Next</Button.Content>
            <Button.Content hidden>
              <Icon name="right arrow" />
            </Button.Content>
          </Button>
        </FormFieldsContainer>
      </Form>
    );
  }
}

export default connect(() => ({}))(reduxForm({ form: 'configure', destroyOnUnmount: false })(Configure));
