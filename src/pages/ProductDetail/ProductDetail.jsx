import React, { useEffect, useState, useMemo } from "react";
import * as S from "./productdetail.style";
import { useParams } from "react-router-dom";
import {
  formatK,
  formatMoney,
  getIdFromURL,
  rateSale,
} from "../../utils/helper";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { addToCart, getProductDetail } from "./productDetail.slice";
import ProductRating from "../../components/ProductRating/ProductRating";
import ProductQuantityController from "../../components/ProductQuantityController/ProductQuantityController";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import { getCartPurchase } from "../Cart/cart.slice";

export default function ProductDetail() {
  const [product, setProduct] = useState();
  const [currentImage, setCurrentImage] = useState({});
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);
  const [quantity, setQuantity] = useState(1);

  const currentImages = useMemo(() => {
    if (product) {
      return product.images.slice(...currentIndexImages);
    }
    return [];
  }, [product, currentIndexImages]);

  const { idProduct } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const realId = getIdFromURL(idProduct);
    console.log(realId);
    dispatch(getProductDetail(realId))
      .then(unwrapResult)
      .then((res) => {
        res.data.images = res.data.images.map((img, index) => ({
          url: img,
          id: index,
        }));
        setProduct(res.data);
        setCurrentImage(res.data.images[0]);
      });
  }, [idProduct]);

  const chooseCurrentImage = (image) => {
    setCurrentImage(image);
  };

  const choosePrev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((currentIndexImages) => [
        currentIndexImages[0] - 1,
        currentIndexImages[1] - 1,
      ]);
    }
  };
  const chooseNext = () => {
    if (currentIndexImages[1] < product.images.length) {
      setCurrentIndexImages((currentIndexImages) => [
        currentIndexImages[0] + 1,
        currentIndexImages[1] + 1,
      ]);
    }
  };

  const handleQuantityChange = (value) => {
    setQuantity(value)
  }

  const handleAddToCart = async () => {
    const body = {
      product_id: product._id,
      buy_count: quantity
    }
    dispatch(addToCart(body)).then(unwrapResult).then((res) => {
      toast.success(res.message, {
        position: "top-center",
        autoClose: 4000,
      })
    })

    await dispatch(getCartPurchase()).then(unwrapResult)

  }
  return (
    <div>
      {product && (
        <div className="container">
          <S.ProductBriefing>
            <S.ProductImages>
              <S.ProductImageActive>
                <img src={currentImage.url} alt="ád" />
              </S.ProductImageActive>
              <S.ProductSlider>
                <S.ProductIconPrev onClick={choosePrev}>
                  <svg
                    enableBackground="new 0 0 13 20"
                    viewBox="0 0 13 20"
                    x={0}
                    y={0}
                    className="shopee-svg-icon icon-arrow-left-bold"
                  >
                    <polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9" />
                  </svg>
                </S.ProductIconPrev>
                {currentImages.map((image) => (
                  <S.ProductImg
                    key={image.id}
                    onMouseEnter={() => chooseCurrentImage(image)}
                    active={currentImage.id === image.id}
                  >
                    <img src={image.url} alt="index" />
                  </S.ProductImg>
                ))}
                <S.ProductIconNext onClick={chooseNext}>
                  <svg
                    enableBackground="new 0 0 13 21"
                    viewBox="0 0 13 21"
                    x={0}
                    y={0}
                    className="shopee-svg-icon icon-arrow-right-bold"
                  >
                    <polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11" />
                  </svg>
                </S.ProductIconNext>
              </S.ProductSlider>
            </S.ProductImages>
            <S.ProductMeta>
              <S.ProductTilte>{product.name}</S.ProductTilte>
              <S.ProductMetaTop>
                <S.ProductRating>
                  <span>{product.rating}</span>
                  <ProductRating rating={product.rating} />
                </S.ProductRating>
                <S.ProductSold>
                  <span>{formatK(product.sold)}</span>
                  <span>Đã bán</span>
                </S.ProductSold>
              </S.ProductMetaTop>
              <S.ProductPrice>
                <S.ProductPriceOriginal>
                  đ{formatMoney(product.price_before_discount)}
                </S.ProductPriceOriginal>
                <S.ProductPriceSale>
                  đ{formatMoney(product.price)}
                </S.ProductPriceSale>
                <S.ProductPriceSalePercent>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </S.ProductPriceSalePercent>
              </S.ProductPrice>
              <S.ProductBuyQuantity>
                <S.ProductBuyQuantityTitle>Số lượng</S.ProductBuyQuantityTitle>
                <S.ProductBuyQuantityController>
                  <ProductQuantityController
                    value={quantity}
                    max={product.quantity}
                    onChange={handleQuantityChange}
                  />
                </S.ProductBuyQuantityController>
                <S.ProductBuyQuantityQuantity>
                  {product.quantity} sản phẩm có sẵn
                </S.ProductBuyQuantityQuantity>
              </S.ProductBuyQuantity>
              <S.ProductButtons onClick={handleAddToCart}>
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x={0}
                  y={0}
                  className="shopee-svg-icon _32Ho0Q icon-add-to-cart"
                >
                  <g>
                    <g>
                      <polyline
                        fill="none"
                        points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                      />
                      <circle cx={6} cy="13.5" r={1} stroke="none" />
                      <circle cx="11.5" cy="13.5" r={1} stroke="none" />
                    </g>
                    <line
                      fill="none"
                      strokeLinecap="round"
                      strokeMiterlimit={10}
                      x1="7.5"
                      x2="10.5"
                      y1={7}
                      y2={7}
                    />
                    <line
                      fill="none"
                      strokeLinecap="round"
                      strokeMiterlimit={10}
                      x1={9}
                      x2={9}
                      y1="8.5"
                      y2="5.5"
                    />
                  </g>
                </svg>
                Thêm vào giỏ hàng
              </S.ProductButtons>
            </S.ProductMeta>
          </S.ProductBriefing>
          <S.ProductContent>
            <S.ProductHeading>MÔ TẢ SẢN PHẨM</S.ProductHeading>
            <S.ProductDetail dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description) 
            }} />
              
          </S.ProductContent>
        </div>
      )}
    </div>
  );
}
