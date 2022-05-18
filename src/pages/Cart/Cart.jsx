import { createNextState, current, unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../../components/Checkbox/Checkbox";
import ProductQuantityController from "../../components/ProductQuantityController/ProductQuantityController";
import { formatMoney } from "../../utils/helper";
import { buyPurchase, deletePurchase, getCartPurchase, updateCartPurchase } from "./cart.slice";
import * as S from "./cart.style";
import keyBy from "lodash/keyBy";
import { toast } from "react-toastify";

export default function Cart() {
  const purchase = useSelector((state) => state.cart.purchase);
  const dispatch = useDispatch();
  const [localPurchase, setLocalPurchase] = useState(() =>
    createNextState(purchase, (draft) => {
      draft.forEach((purchase) => {
        purchase.disabled = false;
        purchase.checked = false;
      });
    })
  );

  const isCheckedAll = localPurchase.every((purchase) => purchase.checked);
  const checkedPurchase = localPurchase.filter((purchase) => purchase.checked);
  const totalCheckedPurchase = checkedPurchase.length;
  const totalCheckedPrice = checkedPurchase.reduce((result, current) => {
    return result + current.product.price * current.buy_count;
  }, 0);
  const totalSavingPrice = checkedPurchase.reduce((result, current) => {
    return (
      result +
      (current.product.price_before_discount - current.product.price) *
        current.buy_count
    );
  }, 0);

  const handleCheckedAll = () => {
    setLocalPurchase((localPurchase) =>
      createNextState(localPurchase, (draft) => {
        draft.forEach((purchase) => {
          purchase.checked = !isCheckedAll;
        });
      })
    );
  };

  useEffect(() => {
    setLocalPurchase((localPurchase) => {
      const localPurchaseObj = keyBy(localPurchase, "_id");
      return createNextState(purchase, (draft) => {
        draft.forEach((purchase) => {
          purchase.disabled = false;
          purchase.checked = Boolean(localPurchaseObj[purchase.id]?.checked);
        });
      });
    });
  }, [purchase]);

  const handleOnInput = (indexPurchase) => (value) => {
    const newLocalPurchase = createNextState(localPurchase, (draft) => {
      draft[indexPurchase].buy_count = value;
    });
    setLocalPurchase(newLocalPurchase);
  };

  const handleOnBlurInput = (indexPurchase) => async (value) => {
    let purchase = localPurchase[indexPurchase];
    setLocalPurchase((localPurchase) =>
      createNextState(localPurchase, (draft) => {
        draft[indexPurchase].disabled = true;
      })
    );

    await dispatch(
      updateCartPurchase({
        product_id: purchase.product._id,
        buy_count: value,
      })
    ).then(unwrapResult);
    await dispatch(getCartPurchase()).then(unwrapResult);

    setLocalPurchase((localPurchase) =>
      createNextState(localPurchase, (draft) => {
        draft[indexPurchase].disabled = false;
      })
    );
  };

  const handleIncreaseAndDecrease = (indexPurchase) => async (value) => {
    let purchase = localPurchase[indexPurchase];
    setLocalPurchase((localPurchase) =>
      createNextState(localPurchase, (draft) => {
        draft[indexPurchase].disabled = true;
        draft[indexPurchase].buy_count = value;
      })
    );

    await dispatch(
      updateCartPurchase({
        product_id: purchase.product._id,
        buy_count: value,
      })
    ).then(unwrapResult);
    await dispatch(getCartPurchase()).then(unwrapResult);

    setLocalPurchase((localPurchase) =>
      createNextState(localPurchase, (draft) => {
        draft[indexPurchase].disabled = false;
      })
    );
  };

  // checkbox
  const handleCheck = (indexPurchase) => (value) => {
    setLocalPurchase((localPurchase) =>
      createNextState(localPurchase, (draft) => {
        draft[indexPurchase].checked = value;
      })
    );
  };
  // deletePurchase
  const handleRemove = indexPurchase => async () => {
    const purchase_id = localPurchase[indexPurchase]._id;
    await dispatch(deletePurchase([purchase_id])).then(unwrapResult);
    await dispatch(getCartPurchase()).then(unwrapResult);
    toast.success("Xóa đơn thành công", {
      position: "top-center",
      autoClose: 3000
    })
  }

  const handleRemoveManyPurchase = async () => {
    const purchase_ids = checkedPurchase.map(purchase => purchase._id);
    await dispatch(deletePurchase([purchase_ids])).then(unwrapResult);
    await dispatch(getCartPurchase()).then(unwrapResult);
    toast.success("Xóa đơn thành công", {
      position: "top-center",
      autoClose: 3000
    })
  }

  const handleBuyPurchase = async () => {
    if(checkedPurchase.length > 0){
      const body = checkedPurchase.map(purchase => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      await dispatch(buyPurchase(body)).then(unwrapResult);
      await dispatch(getCartPurchase()).then(unwrapResult);
      toast.success("Đặt đơn thành công", {
        position: "top-center",
        autoClose: 3000
      })
    }
  }

  return (
    <div className="container">
      <div>
        <S.Header>
          <S.HeaderCheckbox>
            <Checkbox checked={isCheckedAll} onChange={handleCheckedAll} />
          </S.HeaderCheckbox>
          <S.HeaderName>Sản phẩm</S.HeaderName>
          <S.HeaderUnitPrice>Đơn giá</S.HeaderUnitPrice>
          <S.HeaderQuantity>Số lượng</S.HeaderQuantity>
          <S.HeaderTotalPrice>Số tiền</S.HeaderTotalPrice>
          <S.HeaderAction>Thao tác</S.HeaderAction>
        </S.Header>
        <S.Section>
          {localPurchase.map((purchase, index) => (
            <S.CartItem key={purchase._id}>
              <S.CartItemCheckbox>
                <Checkbox
                  checked={purchase.checked}
                  onChange={handleCheck(index)}
                />
              </S.CartItemCheckbox>
              <S.CartItemOverView>
                <S.CartItemOverViewImg to="">
                  <img src={purchase.product.image} alt="img-cart" />
                </S.CartItemOverViewImg>
                <S.CartOverViewNameWrapper>
                  <S.OverViewName to="">{purchase.product.name}</S.OverViewName>
                </S.CartOverViewNameWrapper>
              </S.CartItemOverView>
              <S.CartItemUnitPrice>
                <span>
                  đ{formatMoney(purchase.product.price_before_discount)}
                </span>
                <span>đ{formatMoney(purchase.product.price)}</span>
              </S.CartItemUnitPrice>
              <S.CartItemQuantity>
                <ProductQuantityController
                  max={purchase.product.quantity}
                  value={purchase.buy_count}
                  disabled={purchase.disabled}
                  onInput={handleOnInput(index)}
                  onBlur={handleOnBlurInput(index)}
                  onIncrease={handleIncreaseAndDecrease(index)}
                  onDecrease={handleIncreaseAndDecrease(index)}
                />
              </S.CartItemQuantity>
              <S.CartItemTotalPrice>
                <span>
                  đ{formatMoney(purchase.product.price * purchase.buy_count)}
                </span>
              </S.CartItemTotalPrice>
              <S.CartItemAction>
                <S.ActionButton onClick={handleRemove(index)}>Xóa</S.ActionButton>
              </S.CartItemAction>
            </S.CartItem>
          ))}
        </S.Section>
      </div>
      <S.Footer>
        <S.FooterCheckbox>
          <Checkbox checked={isCheckedAll} onChange={handleCheckedAll} />
        </S.FooterCheckbox>
        <S.FooterButton>Chọn tất cả ({purchase.length})</S.FooterButton>
        <S.FooterButton onClick={handleRemoveManyPurchase}>Xóa</S.FooterButton>
        <S.FooterSpaceBetween />
        <S.FooterPrice>
          <S.FooterPriceTop>
            <div>Tổng thanh toán ({totalCheckedPurchase} sản phẩm): </div>
            <div>đ{formatMoney(totalCheckedPrice)}</div>
          </S.FooterPriceTop>
          <S.FooterPriceBot>
            <div>Tiết kiệm</div>
            <div>đ{formatMoney(totalSavingPrice)}</div>
          </S.FooterPriceBot>
        </S.FooterPrice>
        <S.FooterCheckout onClick={handleBuyPurchase}>Mua hàng</S.FooterCheckout>
      </S.Footer>
    </div>
  );
}
