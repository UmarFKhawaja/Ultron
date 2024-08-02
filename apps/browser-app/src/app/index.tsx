import { Container, Footer, Hero, Level, Media, NavBar, Section } from '../components';

export function App() {
  return (
    <>
      <NavBar/>
      <Hero withNavBar>
        <Hero.Body>
          <Section>
            <Container>
              Hello World!
            </Container>
            <Container>
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
          <Footer>
            <Container>
              <Level>
                <Level.Left>
                  <Level.Item>Foo</Level.Item>
                  <Level.Item>Bar</Level.Item>
                  <Level.Item>Baz</Level.Item>
                </Level.Left>
                <Level.Right>
                  <Level.Item>Yes</Level.Item>
                  <Level.Item>No</Level.Item>
                  <Level.Item>Maybe</Level.Item>
                </Level.Right>
              </Level>
            </Container>
          </Footer>
        </Hero.Foot>
      </Hero>
    </>
  );
}
