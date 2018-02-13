import React from 'react';
import { Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

class Finalize extends React.Component {
  onSubmit = () => {
    this.props.next();
  };

  render() {
    const { handleSubmit, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
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
      </Form>
    );
  }
}

export default connect(state => ({}))(reduxForm({ form: 'seeds', destroyOnUnmount: false })(Finalize));
