import React, { ReactElement } from 'react';
import './Header.css';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveTab } from '../../redux/reducers/navigationSlice';
import { TabName } from '../../redux/types';

const Header = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTabChange = (tabName: TabName): void => {
    dispatch(setActiveTab(tabName));
    navigate(`/${tabName}`);
  };

  return (
    <header className="header">
      <h1 className="header__logo">Async Race</h1>
      <nav className="header__navigation">
        <Button type="button" onClick={(): void => handleTabChange('garage')}>
          Garage
        </Button>
        <Button type="button" onClick={(): void => handleTabChange('winners')}>
          Winners
        </Button>
      </nav>
    </header>
  );
};

export default Header;
