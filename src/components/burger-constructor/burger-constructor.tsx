import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  getConstructor
} from '../../services/slices/constructorSlice';
import {
  clearOrder,
  getOrder,
  isLoading
} from '../../services/slices/orderSlice';
import { createOrder } from '../../services/thunks/orderThunks';
import { user as userSelector } from '../../services/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getConstructor);
  const user = useSelector(userSelector);
  const orderRequest = useSelector(isLoading);
  const orderModalData = useSelector(getOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    dispatch(
      createOrder([
        constructorItems.bun._id,
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id)
      ])
    )
      .unwrap()
      .then(() => dispatch(clearConstructor()));
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
