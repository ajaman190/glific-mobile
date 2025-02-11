import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import SearchBar from '../components/ui/SearchBar';
import customRender from '../utils/jestRender';

describe('SearchBar', () => {
  const setSearchVariableMock = jest.fn();
  const onSearchMock = jest.fn();

  beforeEach(() => {
    setSearchVariableMock.mockClear();
    onSearchMock.mockClear();
  });

  test('should render Search Bar without menu', () => {
    const { getByTestId } = customRender(
      <SearchBar setSearchVariable={setSearchVariableMock} onSearch={onSearchMock} />
    );

    const searchIcon = getByTestId('searchIcon');
    const searchInput = getByTestId('searchInput');

    expect(searchIcon).toBeDefined();
    expect(searchInput).toBeDefined();
  });

  test('should render Search Bar with filters', () => {
    const { getByTestId } = customRender(
      <SearchBar
        setSearchVariable={setSearchVariableMock}
        onSearch={onSearchMock}
        showMenu={true}
      />
    );

    expect(getByTestId('searchIcon')).toBeDefined();
    expect(getByTestId('searchInput')).toBeDefined();
    expect(getByTestId('filterIcon')).toBeDefined();
    expect(getByTestId('filtersContainer')).toBeDefined();
  });

  test('should changes the input value and call onSearch when search button is pressed  ', () => {
    const { getByTestId } = customRender(
      <SearchBar setSearchVariable={setSearchVariableMock} onSearch={onSearchMock} />
    );
    const searchIcon = getByTestId('searchIcon');
    const searchInput = getByTestId('searchInput');

    fireEvent.changeText(searchInput, 'test');
    fireEvent.press(searchIcon);
    expect(onSearchMock).toHaveBeenCalled();
  });
});
