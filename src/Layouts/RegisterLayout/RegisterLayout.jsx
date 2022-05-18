import React from 'react'
import Footer from '../../components/Footer/Footer'
import HeaderRegister from '../../components/HeaderRegister/HeaderRegister'
import PropTypes from "prop-types";

export default function RegisterLayout({children, title}) {
  return (
    <>
      <HeaderRegister title={title} />
      {children}
      <Footer />
    </>
  )
}


RegisterLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};