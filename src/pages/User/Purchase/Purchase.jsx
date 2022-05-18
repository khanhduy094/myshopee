import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getPurchases } from "../user.slice";
import * as S from "./purchase.style";
import { purchaseStatus } from "../../../constants/status";
import { unwrapResult } from "@reduxjs/toolkit";
import useQuery from "../../../hooks/useQuery";
import qs from "query-string";
import { path } from "../../../constants/path";
import { formatMoney, generateNameId } from "../../../utils/helper";

export default function Purchase() {
  const [purchase, setPurchase] = useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const status = useMemo(() => {
    return query.status || purchaseStatus.all;
  }, [query]);

  useEffect(() => {
    dispatch(getPurchases(status))
      .then(unwrapResult)
      .then((res) => {
        setPurchase(res.data);
      });
  }, [status, dispatch]);

  const handleActice = (value) => () => Number(value) === Number(status);

  return (
    <div>
      <S.PurchaseTabs>
        <S.PurchaseTabItem
          to={path.purchase}
          isActive={handleActice(purchaseStatus.all)}
        >
          Tất cả
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: path.purchase,
            search: `${qs.stringify({
              status: purchaseStatus.waitConfirmation,
            })}`,
          }}
          isActive={handleActice(purchaseStatus.waitConfirmation)}
        >
          Chờ xác nhận
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: path.purchase,
            search: `${qs.stringify({
              status: purchaseStatus.waitForGetting,
            })}`,
          }}
          isActive={handleActice(purchaseStatus.waitForGetting)}
        >
          Chờ lấy hàng
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: path.purchase,
            search: `${qs.stringify({
              status: purchaseStatus.inProgess,
            })}`,
          }}
          isActive={handleActice(purchaseStatus.inProgess)}
        >
          Đang giao
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: path.purchase,
            search: `${qs.stringify({
              status: purchaseStatus.delivered,
            })}`,
          }}
          isActive={handleActice(purchaseStatus.delivered)}
        >
          Đã giao
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{
            pathname: path.purchase,
            search: `${qs.stringify({
              status: purchaseStatus.cancelled,
            })}`,
          }}
          isActive={handleActice(purchaseStatus.cancelled)}
        >
          Đã hủy
        </S.PurchaseTabItem>
      </S.PurchaseTabs>

      <S.PurchaseList>
        {purchase.map((purchase, index) => (
          <S.OrderCart key={index}>
            <S.OrderCartContent>
              <S.OrderCartDetail>
                <img src={purchase.product.image} alt="detail" />
                <S.OrderContent>
                  <S.OrderName>{purchase.product.name}</S.OrderName>
                  <S.OrderQuantity>x {purchase.buy_count}</S.OrderQuantity>
                </S.OrderContent>
              </S.OrderCartDetail>
              <S.OrderPrice>đ{formatMoney(purchase.product.price)}</S.OrderPrice>
            </S.OrderCartContent>
            <S.OrderButtonContainer>
              <S.PurchaseButton to={path.product + `/${generateNameId(purchase.product)}`}>Xem sản phẩm</S.PurchaseButton>
              <S.TotalPrice>
                <S.TotalPriceLabel>Tổng giá tiền</S.TotalPriceLabel>
                <S.TotalPricePrice>đ{formatMoney(purchase.product.price * purchase.buy_count)}</S.TotalPricePrice>
              </S.TotalPrice>
            </S.OrderButtonContainer>
          </S.OrderCart>
        ))}
      </S.PurchaseList>
    </div>
  );
} 

 

