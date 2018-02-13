import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form as SemanticForm, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const ErrorText = styled.span`
  font-size: 12px;
  color: red;
`;

const SemanticFormField = ({
  input,
  type,
  label,
  placeholder,
  meta: { touched, error },
  as: As = SemanticForm.Input,
  ...props
}) => {
  return (
    <SemanticForm.Field>
      <As
        {...input}
        {...props}
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

class Configure extends React.Component {
  onSubmit = () => {
    this.props.next();
  };

  render() {
    const { handleSubmit, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <label htmlFor="bracketName">
          Bracket Name
          <Field
            required
            name="bracketName"
            type="text"
            placeholder="Bracket Name"
            component={SemanticFormField}
            validate={[required]}
          />
        </label>

        <label htmlFor="allowNominations">
          Allow Nominations <Icon fitted name="question circle outline" />
          <Field
            name="allowNominations"
            type="checkbox"
            component={SemanticFormField}
            as={SemanticForm.Checkbox}
            toggle
          />
        </label>

        <Button animated disabled={submitting || invalid}>
          <Button.Content visible>Next</Button.Content>
          <Button.Content hidden>
            <Icon name="right arrow" />
          </Button.Content>
        </Button>
      </Form>
    );
  }
}

export default connect(state => ({}))(reduxForm({ form: 'configure', destroyOnUnmount: false })(Configure));
