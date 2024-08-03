import { BottomBar, TopBar } from '../assets';
import { Container, Hero, Media, Section } from '../components';

export function App() {
  return (
    <>
      <TopBar/>
      <Hero withNavBar>
        <Hero.Head>
          <Section>
            <Container fluid>
              Hello World!
            </Container>
          </Section>
        </Hero.Head>
        <Hero.Body>
          <Section>
            <Container fluid>
              <Media>
                <Media.Left>
                  <p>Foo</p>
                </Media.Left>
                <Media.Content>
                  <p>Hello World!</p>
                  <Media>
                    <Media.Left>
                      <p>Foo</p>
                    </Media.Left>
                    <Media.Content>
                      <p>Hello World!</p>
                      <Media>
                        <Media.Left>
                          <p>Foo</p>
                        </Media.Left>
                        <Media.Content>
                          <p>Hello World!</p>
                        </Media.Content>
                      </Media>
                    </Media.Content>
                  </Media>
                </Media.Content>
              </Media>
            </Container>
          </Section>
        </Hero.Body>
        <Hero.Foot>
          <BottomBar/>
        </Hero.Foot>
      </Hero>
    </>
  );
}
