import React, { Component } from 'react';

import { Container, Header, Icon, Step } from 'semantic-ui-react';

import Configure from 'components/Configure';
import Finalize from 'components/Finalize';
import Seeds from 'components/Seeds';

const renderStep = stepTitle => {
  switch (stepTitle) {
    case 'Configure':
      return <Configure />;
    case 'Seeds':
      return <Seeds />;
    case 'Finalize':
      return <Finalize />;
    default:
      return null;
  }
};

export default class Steps extends Component {
  state = {
    currentStep: 'Configure'
  };

  onStepClick = (_, data) => {
    if (data && !data.active) {
      this.setState({ currentStep: data.name });
    }
  };

  render() {
    const { currentStep } = this.state;

    return (
      <Container>
        <Header as="h1">Create a new Bracket</Header>
        <Step.Group widths={3}>
          <Step active={currentStep === 'Configure'} name="Configure" onClick={this.onStepClick}>
            <Icon name="settings" />
            <Step.Content>
              <Step.Title>Configure</Step.Title>
              <Step.Description>Select your options</Step.Description>
            </Step.Content>
          </Step>

          <Step active={currentStep === 'Seeds'} name="Seeds" onClick={this.onStepClick}>
            <Icon name="leaf" />
            <Step.Content>
              <Step.Title>Seeds</Step.Title>
              <Step.Description>Add your seeds</Step.Description>
            </Step.Content>
          </Step>

          <Step active={currentStep === 'Finalize'} name="Finalize" onClick={this.onStepClick}>
            <Icon name="share" />
            <Step.Content>
              <Step.Title>Finalize</Step.Title>
              <Step.Description>Finish Up</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>

        {renderStep(currentStep)}
      </Container>
    );
  }
}
