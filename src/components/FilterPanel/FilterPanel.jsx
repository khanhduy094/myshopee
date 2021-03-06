import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { path } from "../../constants/path";
import RatingStars from "../RatingStars/RatingStars";
import * as S from "./filterPanel.style";
import PropTypes from "prop-types";
import qs from "query-string";
import { Controller, useForm } from "react-hook-form";

export default function FilterPanel({ categories, filters }) {
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      minPrice: filters.minPrice || "",
      maxPrice: filters.maxPrice || "",
    },
    reValidateMode: "onSubmit",
  });

  const validPrice = () => {
    let minPrice = getValues("minPrice");
    let maxPrice = getValues("maxPrice");
    let message = "Vui lòng điền khoảng giá phù hợp";
    if (minPrice !== "" && maxPrice !== "") {
      return Number(minPrice) <= Number(maxPrice) || message;
    }
    return minPrice !== "" || maxPrice !== "" || message;
  };

  const searchPrice = (data) => {
    console.log(data);
    const { minPrice, maxPrice } = data;
    if (minPrice !== "" || maxPrice !== "") {
      let _filters = filters;
      if (minPrice !== "") {
        _filters = { ..._filters, minPrice };
      } else {
        delete _filters.minPrice;
      }

      if (maxPrice !== "") {
        _filters = { ..._filters, maxPrice };
      } else {
        delete _filters.maxPrice;
      }

      history.push(`${path.home}?${qs.stringify(_filters)}`);
    }
  };

  const clearAll = () => {
    reset();
    history.push({
      pathname: path.home,
    });
  };

  useEffect(() => {
    setValue("minPrice", filters.minPrice || "");
    setValue("maxPrice", filters.maxPrice || "");
  }, [setValue, filters]);

  return (
    <div>
      <S.CategoryTitleLink to={path.home}>
        <svg
          viewBox="0 0 12 10"
          className="shopee-svg-icon shopee-category-list__header-icon icon-all-cate"
        >
          <g fillRule="evenodd" stroke="none" strokeWidth={1}>
            <g transform="translate(-373 -208)">
              <g transform="translate(155 191)">
                <g transform="translate(218 17)">
                  <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </S.CategoryTitleLink>

      <S.CategoryList>
        {categories.map((item) => (
          <S.CategoryItem key={item._id}>
            <NavLink
              to={`${path.home}?category=${item._id}`}
              isActive={(match, location) => {
                if (!match) return false;
                let query = qs.parse(location.search);
                return query.category === item._id;
              }}
            >
              {item.name}
            </NavLink>
          </S.CategoryItem>
        ))}
      </S.CategoryList>

      <S.CategoryTitle>
        <svg
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          x={0}
          y={0}
          className="shopee-svg-icon "
        >
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </S.CategoryTitle>
      <S.FilterGroup>
        <S.FilterGroupHeader>Khoảng giá</S.FilterGroupHeader>
        <S.PriceRange>
          <S.PriceRangeGroup>
            <Controller
              control={control}
              name="minPrice"
              rules={{
                validate: {
                  validPrice,
                },
              }}
              render={({ field }) => (
                <S.PriceRangeInput
                  placeholder="Từ"
                  value={getValues("minPrice")}
                  onChange={(value) => {
                    clearErrors();
                    field.onChange(value);
                  }}
                />
              )}
            />

            <S.PriceRangeLine />
            <Controller
              control={control}
              name="maxPrice"
            
              rules={{
                validate: {
                  validPrice,
                },
              }}
              render={({ field }) => (
                <S.PriceRangeInput
                  placeholder="Đến"
                  value={getValues("maxPrice")}
                  onChange={(value) => {
                    clearErrors();
                    field.onChange(value);
                  }}
                />
              )}
            />
          </S.PriceRangeGroup>
          {Object.values(errors).length !== 0 && (
            <S.PriceErrorMessage>
              Vui lòng điền khoảng giá phù hợp
            </S.PriceErrorMessage>
          )}

          <S.PriceRangeButton onClick={handleSubmit(searchPrice)}>
            Áp dụng
          </S.PriceRangeButton>
        </S.PriceRange>
      </S.FilterGroup>
      <S.FilterGroup>
        <S.FilterGroupHeader>Đánh giá</S.FilterGroupHeader>
        <RatingStars filters={filters}/>
      </S.FilterGroup>
      <S.RemoveFilterButton onClick={clearAll}>Xóa tất cả</S.RemoveFilterButton>
    </div>
  );
}

FilterPanel.propTypes = {
  categories: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
};
