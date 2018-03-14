// @flow

import React from 'react';
import { Container, Header, Icon, Step } from 'semantic-ui-react';

import Configure from 'components/Configure';
import Finalize from 'components/Finalize';
import Seeds from 'components/Seeds';
import withAuthorization from 'hoc/withAuthorization';

const steps = [
  {
    name: 'Configure',
    active: true,
    completed: false,
    disabled: false,
    title: 'Configure',
    description: 'Select Your Options',
    icon: <Icon name="settings" />
  },
  {
    name: 'Seeds',
    active: false,
    completed: false,
    disabled: true,
    title: 'Seeds',
    description: 'Add your shows',
    icon: <Icon name="leaf" />
  },
  {
    name: 'Share',
    active: false,
    completed: false,
    disabled: true,
    title: 'Share',
    description: 'Share Your Bracket',
    icon: <Icon name="share" />
  }
];

class Steps extends React.Component<{ history: Object }, { currentStep: Object, currentIndex: number }> {
  state = {
    currentStep: steps[0],
    currentIndex: 0
  };

  renderStep = (stepTitle: string) => {
    switch (stepTitle) {
      case 'Configure':
        return <Configure next={this.next} back={this.back} />;
      case 'Seeds':
        return <Seeds next={this.next} back={this.back} />;
      case 'Share':
        return <Finalize next={this.next} back={this.back} />;
      default:
        return null;
    }
  };

  next = () => {
    const { currentIndex } = this.state;
    const { history } = this.props;

    // update current step
    steps[currentIndex].active = false;
    steps[currentIndex].completed = true;

    if (currentIndex + 1 < steps.length) {
      // update next step
      steps[currentIndex + 1].active = true;
      steps[currentIndex + 1].disabled = false;

      this.setState({ currentStep: steps[currentIndex + 1], currentIndex: currentIndex + 1 });
    }

    if (currentIndex + 1 === steps.length) {
      this.setState({ currentStep: steps[currentIndex] });
    }
  };

  back = () => {
    const { currentIndex } = this.state;

    // update current step
    steps[currentIndex].active = false;
    steps[currentIndex].completed = false;
    steps[currentIndex].disabled = true;

    if (currentIndex - 1 >= 0) {
      // update previous step
      steps[currentIndex - 1].active = true;
      steps[currentIndex - 1].completed = false;
      steps[currentIndex - 1].disabled = false;

      this.setState({ currentStep: steps[currentIndex - 1], currentIndex: currentIndex - 1 });
    }
  };

  render() {
    const { currentStep } = this.state;

    return (
      <Container>
        <Header as="h1">Create a new Bracket</Header>
        <Step.Group widths={3}>
          {steps.map(step => {
            return (
              <Step
                key={step.name}
                name={step.name}
                active={step.active}
                disabled={step.disabled}
                completed={step.completed}>
                {step.icon}
                <Step.Content>
                  <Step.Title>{step.title}</Step.Title>
                  <Step.Description>{step.description}</Step.Description>
                </Step.Content>
              </Step>
            );
          })}
        </Step.Group>
        {this.renderStep(currentStep.name)}
      </Container>
    );
  }
}

export default withAuthorization(Steps);
