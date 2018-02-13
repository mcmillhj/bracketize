import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Card, Form as SemanticForm, Grid, Icon, Image, Search } from 'semantic-ui-react';
import styled from 'styled-components';
import _ from 'lodash';

const ErrorText = styled.span`
  font-size: 12px;
  color: red;
`;

const ButtonsContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const Center = styled.section`
  text-align: center;
  margin: 0 auto;
`;

const CloseButton = styled(Button)`
  &&& {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    margin: 0;
    border-radius: 0;
  }
`;

const source = [
  {
    end_year: 1999,
    image: 'https://media.kitsu.io/anime/poster_images/1/medium.jpg?1431697256',
    start_year: 1998,
    status: 'FINISHED',
    synopsis:
      'In the year 2071, humanity has colonized several of the planets and moons of the solar system leaving the now uninhabitable surface of planet Earth behind. The Inter Solar System Police attempts to keep peace in the galaxy, aided in part by outlaw bounty hunters, referred to as "Cowboys". The ragtag team aboard the spaceship Bebop are two such individuals.\r\nMellow and carefree Spike Spiegel is balanced by his boisterous, pragmatic partner Jet Black as the pair makes a living chasing bounties and collecting rewards. Thrown off course by the addition of new members that they meet in their travels\u2014Ein, a genetically engineered, highly intelligent Welsh Corgi; femme fatale Faye Valentine, an enigmatic trickster with memory loss; and the strange computer whiz kid Edward Wong\u2014the crew embarks on thrilling adventures that unravel each member\'s dark and mysterious past little by little. \r\nWell-balanced with high density action and light-hearted comedy, Cowboy Bebop is a space Western classic and an homage to the smooth and improvised music it is named after.  \r\n[Written by MAL Rewrite]',
    title: 'Cowboy Bebop',
    title_en: 'Cowboy Bebop',
    type: 'TV'
  },
  {
    end_year: 1998,
    image: 'https://media.kitsu.io/anime/poster_images/3/medium.jpg?1432381605',
    start_year: 1998,
    status: 'FINISHED',
    synopsis:
      'Vash the Stampede is the man with a $$60,000,000 bounty on his head. The reason: he\'s a merciless villain who lays waste to all those that oppose him and flattens entire cities for fun, garnering him the title "The Humanoid Typhoon." He leaves a trail of death and destruction wherever he goes, and anyone can count themselves dead if they so much as make eye contact\u2014or so the rumors say. In actuality, Vash is a huge softie who claims to have never taken a life and avoids violence at all costs.\r\nWith his crazy doughnut obsession and buffoonish attitude in tow, Vash traverses the wasteland of the planet Gunsmoke, all the while followed by two insurance agents, Meryl Stryfe and Milly Thompson, who attempt to minimize his impact on the public. But soon, their misadventures evolve into life-or-death situations as a group of legendary assassins are summoned to bring about suffering to the trio. Vash\'s agonizing past will be unraveled and his morality and principles pushed to the breaking point.\r\n[Written by MAL Rewrite]',
    title: 'Trigun',
    title_en: 'Trigun',
    type: 'TV'
  },
  {
    end_year: 2002,
    image: 'https://media.kitsu.io/anime/poster_images/4/medium.jpg?1408440451',
    start_year: 2002,
    status: 'FINISHED',
    synopsis:
      "Witches are individuals with special powers like ESP, telekinesis, mind control, etc. (not the typical hogwart and newt potions). Robin, a 15-year-old craft user, arrives from Italy to Japan to work for an organization named STN Japan Division (STN-J) as a replacement for one of STN-J's witch hunters who was recently killed. Unlike other divisions of STN, STN-J tries to capture the witches alive in order to learn why and how they became witches in the first place.",
    title: 'Witch Hunter Robin',
    title_en: 'Witch Hunter Robin',
    type: 'TV'
  },
  {
    end_year: 2014,
    image: 'https://media.kitsu.io/anime/poster_images/8270/medium.jpg?1462992481',
    start_year: 2014,
    status: 'FINISHED',
    synopsis:
      "Night Raid is the covert assassination branch of the Revolutionary Army, an uprising assembled to overthrow Prime Minister Honest, whose avarice and greed for power has lead him to take advantage of the child emperor's inexperience. Without a strong and benevolent leader, the rest of the nation is left to drown in poverty, strife, and ruin. Though the Night Raid members are all experienced killers, they understand that taking lives is far from commendable and that they will likely face retribution as they mercilessly eliminate anyone who stands in the revolution's way.\r\nThis merry band of assassins' newest member is Tatsumi, a na\u00efve boy from a remote village who had embarked on a journey to help his impoverished hometown and was won over by not only Night Raid's ideals, but also their resolve. Akame ga Kill! follows Tatsumi as he fights the Empire and comes face-to-face with powerful weapons, enemy assassins, challenges to his own morals and values, and ultimately, what it truly means to be an assassin with a cause.\r\n[Written by MAL Rewrite]",
    title: 'Akame ga Kill!',
    title_en: 'Akame ga Kill!',
    type: 'TV'
  },
  {
    end_year: 2014,
    image: 'https://media.kitsu.io/anime/poster_images/8271/medium.jpg?1416240363',
    start_year: 2014,
    status: 'FINISHED',
    synopsis:
      "Tokyo has become a cruel and merciless city\u2014a place where vicious creatures called \u201cghouls\u201d exist alongside humans. The citizens of this once great metropolis live in constant fear of these bloodthirsty savages and their thirst for human flesh. However, the greatest threat these ghouls pose is their dangerous ability to masquerade as humans and blend in with society.\r\nBased on the best-selling supernatural horror manga by Sui Ishida, Tokyo Ghoul follows Ken Kaneki, a shy, bookish college student, who is instantly drawn to Rize Kamishiro, an avid reader like himself. However, Rize is not exactly who she seems, and this unfortunate meeting pushes Kaneki into the dark depths of the ghouls' inhuman world. In a twist of fate, Kaneki is saved by the enigmatic waitress Touka Kirishima, and thus begins his new, secret life as a half-ghoul/half-human who must find a way to integrate into both societies.\r\n[Written by MAL Rewrite]",
    title: 'Tokyo Ghoul',
    title_en: 'Tokyo Ghoul',
    type: 'TV'
  },
  {
    end_year: 2015,
    image: 'https://media.kitsu.io/anime/poster_images/9135/medium.jpg?1417384264',
    start_year: 2015,
    status: 'FINISHED',
    synopsis:
      "In Tokyo Ghoul \u221aA, monsters live among humans, looking like them while craving their flesh. That is the world Ken Kaneki has struggled to navigate ever since a first date went horrifically awry and transformed him into a half-human, half-ghoul. For months, he has fought against his new cannibalistic hunger and violent tendencies. But after being captured and tortured by a sadistic ghoul, Kaneki has accepted his darker half as his only means for survival.\r\nHis choice could not be more timely. Tokyo has become a battleground between humans and ghouls. The CCG, a government agency created to deal with the perceived ghoul threat, has ramped up its efforts to eradicate the inhuman monsters. In response, the terrorist ghoul organization, Aogiri Tree, has made destroying the CCG its priority. And throughout it all, the ghouls who frequent the coffee shop Anteiku merely want to live a peaceful life. But Kaneki, who worked at Anteiku while he attempted to reconcile his human and ghoul halves, makes a shocking decision: he joins Aogiri Tree. Even as his choice sends shockwaves through his newfound friends, many more questions are raised. What is Aogiri Tree's true purpose? Will the CCG triumph over the ghouls? And has Kaneki truly betrayed his friends and everything that Anteiku stands for?",
    title: 'Tokyo Ghoul \u221aA',
    title_en: 'Tokyo Ghoul \u221aA',
    type: 'TV'
  },
  {
    end_year: 2016,
    image: 'https://media.kitsu.io/anime/poster_images/11406/medium.jpg?1467229076',
    start_year: 2016,
    status: 'FINISHED',
    synopsis:
      'In the spring of his second year of high school, Koyomi Araragi met the beautiful vampire Kiss-shot Acerola-orion Heart-under-blade. Koyomi saved Kiss-shot, who was on the verge of death with all four of her limbs cut off, but only at the expense of becoming her minion and a vampire.\r\n"In order to go back to being a human again, you must take back all of Kiss-shot\'s limbs." After receiving advice from Meme Oshino, an expert in the supernatural, Koyomi prepares to go into battle.\r\nAwaiting him are three powerful vampire hunters\u2014Dramaturgy, a giant vampire hunter who is a vampire himself. Episode, a half-vampire who wields an enormous cross, and Guillotinecutter, a quiet man who specializes in killing vampires.\r\nWill Koyomi be able to take back Kiss-shot\'s limbs from the vampire hunters? Amidst the soft spring rain, the curtain rises on this fateful blood bath\u2026\r\n(Source: Aniplex USA)',
    title: 'Kizumonogatari II: Nekketsu-hen',
    title_en: 'Kizumonogatari Part 2: Nekketsu',
    type: 'MOVIE'
  }
];

// const SemanticFormField = ({
//   input,
//   type,
//   label,
//   placeholder,
//   meta: { touched, error },
//   as: As = SemanticForm.Input,
//   ...props
// }) => {
//   return (
//     <SemanticForm.Field>
//       <As
//         {...input}
//         {...props}
//         value={type !== 'checkbox' ? input.value : ''}
//         type={type}
//         label={label}
//         placeholder={placeholder}
//         onChange={(e, { value, checked }) => (type === 'checkbox' ? input.onChange(checked) : input.onChange(value))}
//       />
//       {touched &&
//         error && (
//           <ErrorText>
//             <i>{error}</i>
//           </ErrorText>
//         )}
//     </SemanticForm.Field>
//   );
// };

class Seeds extends React.Component {
  state = {
    results: [],
    isLoading: false,
    value: '',
    cards: []
  };

  handleResultSelect = (e, { result }) => {
    this.setState({ cards: _.uniqBy([].concat(this.state.cards, result)), value: '' });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      const re = new RegExp(this.state.value, 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: source.filter(s => isMatch(s))
      });
    }, 500);
  };

  onSubmit = () => {
    this.props.next();
  };

  render() {
    const { handleSubmit, submitting, invalid } = this.props;
    const { isLoading, value, results, cards } = this.state;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <Center>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
          />

          {cards.length > 0 && (
            <Grid doubling stretched columns={4}>
              {cards.map(c => (
                <Grid.Column key={c.title}>
                  <Card>
                    <div style={{ position: 'relative' }}>
                      <Image src={c.image} />
                      <CloseButton
                        icon={<Icon name="close" />}
                        onClick={e => {
                          e.preventDefault();

                          this.setState({ cards: cards.filter(x => x.title !== c.title) });
                        }}
                      />
                    </div>
                    <Card.Content textAlign={'left'}>
                      <Card.Header>{c.title}</Card.Header>
                      <Card.Meta>
                        <span className="date">{`${c.start_year} - ${c.end_year}`}</span>
                      </Card.Meta>
                      {/* <Card.Description>{c.synopsis.substring(0, 197) + '...'}</Card.Description> */}
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

            <Button animated disabled={submitting || invalid}>
              <Button.Content visible>Next</Button.Content>
              <Button.Content hidden>
                <Icon name="right arrow" />
              </Button.Content>
            </Button>
          </ButtonsContainer>
        </Center>
      </Form>
    );
  }
}

export default connect(state => ({}))(reduxForm({ form: 'seeds', destroyOnUnmount: false })(Seeds));
