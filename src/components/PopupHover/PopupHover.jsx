import React, { Fragment } from "react";
import * as S from "./popuphover.style";
import PropTypes from "prop-types";
export default function PopupHover({ active, children }) {
  return (
    <Fragment>
      {active && (
        <S.Drawer>
          <S.PropupArrow />
          <S.PopupContent>{children}</S.PopupContent>
        </S.Drawer>
      )}
    </Fragment>
  );
}

PopupHover.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
