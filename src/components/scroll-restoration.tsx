import { useRouteHandle } from "@/hooks/useUtility";
import { FC, useEffect } from "react";
import { useLocation } from "react-router";

const scrollPositions: Record<string, number> = {};

function findElementWithScrollbar(rootElement: Element = document.body): Element | null {
  if (rootElement.scrollHeight > rootElement.clientHeight) {
    return rootElement;
  }
  for (let i = 0; i < rootElement.children.length; i++) {
    const childElement = rootElement.children[i];
    const elementWithScrollbar = findElementWithScrollbar(childElement);
    if (elementWithScrollbar) {
      return elementWithScrollbar;
    }
  }
  return null;
}

export const ScrollRestoration: FC = () => {
  const location = useLocation();
  const [handle] = useRouteHandle();

  useEffect(() => {
    const content = findElementWithScrollbar();
    if (content) {
      const key = `${location.pathname}${location.search}`;
      
      if (handle?.scrollRestoration !== undefined) {
        content.scrollTo(0, handle.scrollRestoration);
      } else if (scrollPositions[key]) {
        // Nếu có vị trí đã lưu cho trang này, khôi phục lại
        content.scrollTo(0, scrollPositions[key]);
      } else {
        // Nếu không, mặc định cuộn lên đầu trang
        content.scrollTo(0, 0);
      }

      const saveScrollPosition = () => {
        scrollPositions[key] = content.scrollTop;
      };
      
      content.addEventListener("scroll", saveScrollPosition);
      return () => content.removeEventListener("scroll", saveScrollPosition);
    }
    return undefined;
  }, [location]);

  return null; // Component này không cần render gì cả
};