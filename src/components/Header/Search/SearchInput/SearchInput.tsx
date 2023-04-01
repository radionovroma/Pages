import { FC, useEffect, useRef, useMemo, ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { actions } from "@store/search";
import SearchSvg from "@img/search-icon.svg";
import CrossSvg from "@img/cross-icon.svg";
import { debounce } from "lodash";

interface SearchInputProps {
  value: string;
  isSearchActive: boolean;
  onChange: (text: string) => void;
  onFocusChange: () => void;
}

export const SearchInput: FC<SearchInputProps> = ({value, isSearchActive, onChange, onFocusChange}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(actions.reset() as any);
    onChange("");
  }, [location])

  const debouncedSearch = useMemo(
    () => debounce((text: string) => dispatch(actions.search(text) as any), 1500),
    []);

  const focusHandler = () => {
    inputRef.current?.select();
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: {value: newValue}} = e;
    if (newValue) {
      debouncedSearch(newValue);
    } else {
      debouncedSearch.cancel();
      dispatch(actions.reset() as any);
    }
    onChange(newValue);
  };

  const inputClickHandler = () => {
    if (!isSearchActive) {
      onFocusChange();
    }
  }

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if ( key === "Enter") {
      debouncedSearch.flush();
    }
  }

  const buttonClickHandler = () => {
    onChange("");
    if (isSearchActive) {
      onFocusChange();
    }
    debouncedSearch.cancel();
    dispatch(actions.reset() as any);
  }

  return (
    <div className="group flex items-center gap-10 w-[350px] px-5 pb-5 border-b border-b-white cursor-text hover:border-b-yellow header-svg-stroke">
      <SearchSvg onClick={focusHandler}/>
      <input
        value={value}
        placeholder="Search"
        ref={inputRef}
        className="flex-1 h-[37px] bg-blue/0 caret-white font-sans text-lg text-white outline-0 group-hover:text-yellow group-hover:placeholder:text-yellow"
        onChange={(e) => inputChangeHandler(e)}
        onKeyDown={(e) => keyDownHandler(e)}
        onClick={inputClickHandler}/>
      <button
        onClick={buttonClickHandler}>
        <CrossSvg/>
      </button>
    </div>
  );
}
