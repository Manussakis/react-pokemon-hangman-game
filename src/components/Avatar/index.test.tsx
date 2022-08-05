import { render, screen } from "@testing-library/react";
import { Avatar } from './index';
import { AvatarProps } from './types';

const avatarProps: AvatarProps = {
  image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
  flavorText: "When several of\nthese POKéMON\ngather, their\felectricity could\nbuild and cause\nlightning storms.",
  isLoading: false,
};

describe('Avatar component', () => {
  test('loads image', () => {
    render(<Avatar {...avatarProps} />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', avatarProps.image);
    expect(image).toHaveAttribute('alt', avatarProps.flavorText);
  });

  test('loads loader', () => {
    const avatarIsLoadingProps: AvatarProps = {
      ...avatarProps,
      isLoading: true,
    };

    const loaderImage = 'pokeball.svg';

    render(<Avatar {...avatarIsLoadingProps} />);

    const loader = screen.getByText(loaderImage);

    expect(loader).toBeInTheDocument();
  });
})
