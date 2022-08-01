// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartItemState } from '../reducers/cart.reducer';
import { CompareState } from '../reducers/compare.reducer';

export const getCartItemsState = createFeatureSelector<CartItemState>('cart');
export const getCompareState = createFeatureSelector<CompareState>('compare');

/************************    CartItem Selectors   ***********************/
export const cartItemsSelector = createSelector(
    getCartItemsState, cartItemState => {
        return cartItemState.data;
    }
);

/************************    Compare Selectors   ***********************/
export const compareSelector = createSelector(
    getCompareState, compareState => {
        return compareState.data;
    }
);