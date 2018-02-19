import React from 'react';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Card, Form as SemanticForm, Grid, Icon, Image, Search } from 'semantic-ui-react';
import styled from 'styled-components';
import _ from 'lodash';
import elasticsearch from 'elasticsearch';

import { createBracket } from 'state/createBracket';
import { addSeed, removeSeed } from 'state/seeds';

const ButtonsContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${10 / 16}rem 0;
`;

const Center = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled(Button)`
  &&& {
    position: absolute;
    top: 0;
    right: 0;
    padding: ${5 / 16}rem;
    margin: 0;
    border-radius: 0;
  }
`;

const CardImageContainer = styled.section`
  position: relative;
`;

const SearchInput = styled(Search)`
  &&& {
    border-radius: 0;
    margin-bottom: ${10 / 16}rem;
  }
`;

class Seeds extends React.Component {
  state = {
    results: [],
    isLoading: false,
    value: ''
  };

  constructor(props) {
    super(props);

    this.client = new elasticsearch.Client({
      host: 'https://search-catalog-2-fgyjtvisrgzn5v6boz6kswhxdi.us-east-1.es.amazonaws.com'
    });
  }

  handleResultSelect = (e, { result }) => {
    this.props.addSeed(result);

    this.setState({ value: '' });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value }, () =>
      this.query()
        .then(response => {
          this.setState({
            isLoading: false,
            results: _.take(
              _.sortedUniqBy(
                _.flattenDeep(response.suggest.title_suggest.map(h => h.options.map(e => this.transform(e)))),
                s => s.title
              ),
              10
            )
          });
        })
        .catch(error => {
          console.error(error);

          this.setState({ isLoading: false });
        })
    );
  };

  transform = e => ({
    ...e._source,
    description: `${e._source.start_year} - ${e._source.end_year}`,
    title: e._source.title_en || e._source.title
  });

  query() {
    return this.client.search({
      index: 'anime',
      body: {
        suggest: {
          title_suggest: {
            text: this.state.value,
            completion: {
              field: 'title_suggest',
              size: 15
            }
          }
        }
      }
    });
  }

  onSubmit = () => {
    const { authUser, seeds, bracketName, bracketSize } = this.props;

    this.props.createBracket(authUser, {
      seeds,
      created: Date.now(),
      name: bracketName,
      size: bracketSize,
      status: 'IN_PROGRESS'
    });
    this.props.next();
  };

  render() {
    const { seeds, bracketSize } = this.props;
    const { isLoading, value, results } = this.state;

    return (
      <SemanticForm onSubmit={this.onSubmit}>
        <Center>
          <SearchInput
            selectFirstResult
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
          />
        </Center>

        {seeds.length > 0 && (
          <Grid doubling stretched columns={4}>
            {seeds.map(c => (
              <Grid.Column key={c.title}>
                <Card>
                  <CardImageContainer>
                    <Image src={c.image} />
                    <CloseButton
                      icon={<Icon name="close" />}
                      onClick={e => {
                        e.preventDefault();

                        this.props.removeSeed(c);
                      }}
                    />
                  </CardImageContainer>
                  <Card.Content textAlign={'left'}>
                    <Card.Header>{c.title}</Card.Header>
                    <Card.Meta>
                      <span className="date">{`${c.start_year} - ${c.end_year}`}</span>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid>
        )}

        <ButtonsContainer>
          <Button animated type="button" onClick={() => this.props.back()}>
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name="left arrow" />
            </Button.Content>
          </Button>
          <Button animated disabled={seeds.length !== bracketSize}>
            <Button.Content visible>Next</Button.Content>
            <Button.Content hidden>
              <Icon name="right arrow" />
            </Button.Content>
          </Button>
        </ButtonsContainer>
      </SemanticForm>
    );
  }
}

export default connect(
  state => ({
    seeds: state.seeds,
    authUser: state.auth.authUser,
    bracketSize: getFormValues('configure')(state).bracketSize,
    bracketName: getFormValues('configure')(state).bracketName
  }),
  {
    addSeed,
    removeSeed,
    createBracket
  }
)(Seeds);
