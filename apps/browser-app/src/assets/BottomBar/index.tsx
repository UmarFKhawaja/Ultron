import { FC } from 'react';
import { Container, Footer, Level } from '../../components';
import { BottomBarProps } from './props';

export const BottomBar: FC<BottomBarProps> = () => {
  return (
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
  );
}
