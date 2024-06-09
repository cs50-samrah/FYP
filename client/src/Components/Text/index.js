import React from 'react';

export default ({
  children,
  style,
  textAlign,
  bg,
  rounded,
  p,
  pt,
  pb,
  pl,
  pr,
  m,
  ml,
  mt,
  mb,
  mr,
  w,
  h,
  color,
  fontSize,
  alignItems,
  flex,
  flexDirection,
  justifyContent,
  fontWeight,
  fontFamily,
  lineHeight,
  lineBreak,
}) => {
 

  return (
    <p
      style={{
        textAlign,
        lineHeight,
        lineBreak,
        alignItems,
        flexDirection,
        justifyContent,
        color,
        fontFamily,
        fontSize,
        fontWeight,
        borderRadius: rounded,
        padding: p,
        margin: m,
        backgroundColor: bg,
        width: w,
        height: h,
        paddingLeft: pl,
        paddingRight: pr,
        paddingTop: pt,
        paddingBottom: pb,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
        flex: flex ? 1 : null,
        ...style
      }}>
      {children}
    </p>
  );
};