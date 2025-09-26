import { keywordState } from "@/state";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "zmp-ui";
import { InputProps } from "zmp-ui/input";

const SearchBar = (props: InputProps) => {
  const [localKeyword, setLocalKeyword] = useState("");
  const [keyword, setKeyword] = useAtom(keywordState);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/search" && inputRef.current) {
      inputRef.current.focus();
    }
    return () => {
      setKeyword("");
    };
  }, [location]);

  return (
    <Input.Search
      size="small"
      placeholder="Bạn muốn mua gì..."
      className="border-none outline-none m-0 rounded-full" // <-- THAY ĐỔI TẠI ĐÂY
      style={{
        viewTransitionName: "search-bar",
      }}
      value={localKeyword}
      onChange={(e) => setLocalKeyword(e.currentTarget.value)}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          setKeyword(localKeyword);
        }
      }}
      onBlur={() => setKeyword(localKeyword)}
      clearable
      {...props}
    />
  );
};

export default SearchBar;