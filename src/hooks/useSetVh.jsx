// import { useEffect } from "react";

// const useSetVh = () => {
//   useEffect(() => {
//     const setVh = () => {
//       const vh = window.innerHeight * 0.01;
//       document.documentElement.style.setProperty("--vh", `${vh}px`);
//     };

//     setVh();
//     window.addEventListener("resize", setVh);

//     return () => {
//       window.removeEventListener("resize", setVh);
//     };
//   }, []);
// };

// export default useSetVh;

import { useEffect } from "react";

const useSetVh = headerRef => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      // 헤더 높이를 계산하고 CSS 변수로 설정
      if (headerRef?.current) {
        const headerHeight = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
      }
    };

    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, [headerRef]);
};

export default useSetVh;
