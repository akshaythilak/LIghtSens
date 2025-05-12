/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

import i18n from './i18n';

const LANGUAGE_DIRECTION: { [key: string]: string } = {
  en: 'ltr',
  ar: 'rtl',
};

const useDirection = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const savedDirection = localStorage.getItem('direction');
    const direction = savedDirection || LANGUAGE_DIRECTION[i18n.language] || 'ltr';
    if (wrapper) {
      wrapper.dir = direction; // Set the direction for this specific component
    }
    // console.log(direction, "direction");

    localStorage.setItem('direction', direction);
    return () => {
      //   document.documentElement.dir = "ltr"; // Reset to LTR on unmount
      if (wrapper) {
        wrapper.dir = 'ltr'; // Reset direction when component unmounts
      }
    };
  }, [i18n.language]);
  return wrapperRef;
};

export default useDirection;
