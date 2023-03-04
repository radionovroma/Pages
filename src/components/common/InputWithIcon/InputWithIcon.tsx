import { FC, useState, useRef } from 'react';

interface InputWithProps {
  img: any;
  placeholder: string;
  wrapStyles: string;
  inputStyles: string;
}

export const InputWithIcon: FC<InputWithProps> = ({ img, placeholder, wrapStyles, inputStyles }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = () => {
    inputRef.current?.select();
  };

  return (
    <div className={wrapStyles} onClick={focus}>
      {img}
      <input
        value={value}
        placeholder={placeholder}
        ref={inputRef}
        className={inputStyles}
        onChange={(e) => {
          setValue(e.target.value)
        }}/>
    </div>
  );
}
