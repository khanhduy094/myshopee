import React from "react";
import { Link } from "react-router-dom";
import ProductRating from "../ProductRating/ProductRating";
import * as S from "./productItem.style";
import PropTypes from "prop-types";
import { path } from "../../constants/path";
import { formatK, formatMoney, generateNameId } from "../../utils/helper";

export default function ProductItem({product}) {

  // console.log(product);

  return (
    <S.Product>
      <Link to={`${path.product}/${generateNameId(product)}`}>
        <S.ProductItem>
          <S.ProductImage>
            <img
              src={product.image}
              atl={product.name}
            />
          </S.ProductImage>
          <S.ProductInfo>
            <S.ProductTitle>
              {product.name}
            </S.ProductTitle>
            <S.ProductPrice>
                <S.ProductPriceOriginal>đ{formatMoney(product.price_before_discount)}</S.ProductPriceOriginal>
                <S.ProductPriceSale>đ{formatMoney(product.price)}</S.ProductPriceSale>
            </S.ProductPrice>
            <S.ProductMeta>
                <ProductRating rating={product.rating}/>
                <S.ProductSold>
                    <span>{formatK(product.sold)}</span>
                    <span>Đã bán</span>
                </S.ProductSold>
            </S.ProductMeta>
          </S.ProductInfo>
        </S.ProductItem>
      </Link>
    </S.Product>
  );
}


ProductItem.propTypes = {
  product: PropTypes.object
}