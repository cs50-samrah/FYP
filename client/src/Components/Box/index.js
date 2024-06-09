import React from 'react';

export default ({
  children,
  style,
  bg,
  display,
  rounded,
  id,
  padding,
  pt,
  pb,
  pl,
  pr,
  margin,
  ml,
  mt,
  mb,
  mr,
  w,
  h,
  alignItems,
  flex,
  flexDirection,
  justifyContent,
  flexWrap,
  position,
  zIndex,
  top,
  left,
  bottom,
  right,
  className,
  onClick
}) => {



  return (
    <div
      id={id}
      className={className}
      onClick={onClick}
      style={{
        padding,
        alignItems,
        flexDirection,
        justifyContent,
        position,
        flexWrap,
        zIndex,
        top,
        left,
        bottom,
        right,
        borderRadius: rounded,
        margin,
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
        display,
        ...style
      }} >
      {children}
    </div>
  );
};