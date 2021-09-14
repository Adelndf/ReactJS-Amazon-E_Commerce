import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';

function Header({ displaySearch }) {
    const [{basket, user}] = useStateValue();

    const login = () => {
        auth.signOut();
    }

    return (
        <div className='header'>
            <Link to='/'>
                <img
                    className='header__logo' 
                    src='https://upload.wikimedia.org/wikipedia/donate/thumb/f/fd/Amazon-logo-white.svg/800px-Amazon-logo-white.svg.png'
                    alt=''
                />
            </Link>
            <div className={displaySearch ? "header__searchDis" : "header__search"}>
                <input className='header__searchInput' type='text' />
                <SearchIcon className='header__searchIcon' />
            </div>
            <div className="header__nav">
                <Link to={!user && '/login'} className="header__link">
                    <div className="header__option">
                        <span onClick={login} className='header__optionLineOne'>Hello {!user ? 'Guest' : user.email}</span>
                        <span className='header__optionLineTwo'>{user ? 'Sign out' : 'Sign In'}</span>
                    </div>
                </Link>
                <Link to='/orders' className="header__link">
                    <div className="header__option">
                        <span className='header__optionLineOne'>Returns</span>
                        <span className='header__optionLineTwo'>& Orders</span>
                    </div>
                </Link>
                <Link to='/' className="header__link">
                    <div className="header__option">
                        <span className='header__optionLineOne'>Your</span>
                        <span className='header__optionLineTwo'>Prime</span>
                    </div>
                </Link>
                <Link to='/checkout' className="header__link">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className='header__optionLineTwo'>{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header


