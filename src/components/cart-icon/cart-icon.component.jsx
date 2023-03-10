import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../resources/shopping-bag.svg';

import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartQuantity } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className='cart-icon-container'>
      <ShoppingIcon
        className='shopping-icon'
        onClick={toggleIsCartOpen}
      />
      <span className='item-count'>{cartQuantity}</span>
    </div>
  );
};

export default CartIcon;
