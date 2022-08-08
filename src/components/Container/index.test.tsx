import { render, screen } from '@testing-library/react'
import { ContainerSizesEnum } from './enums';
import { Container } from './index';

describe('Container component', () => {
  test('loads small size', () => {
    const containerSmallContent =  'Container small';

    render(<Container size={ContainerSizesEnum.SMALL}>{ containerSmallContent }</Container>);

    const containerSmall = screen.getByText(containerSmallContent);

    expect(containerSmall).toBeInTheDocument();
  });

  test('loads medium size', () => {
    const containerMediumContent =  'Container small';

    render(<Container size={ContainerSizesEnum.MEDIUM}>{ containerMediumContent }</Container>);

    const containerMedium = screen.getByText(containerMediumContent);

    expect(containerMedium).toBeInTheDocument();
  });
});
