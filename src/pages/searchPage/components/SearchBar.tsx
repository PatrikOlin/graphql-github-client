import React, { useEffect, useRef } from "react";
import styles from "../../../styles.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      className={`${styles.searchBar}`}
      placeholder="Search..."
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
