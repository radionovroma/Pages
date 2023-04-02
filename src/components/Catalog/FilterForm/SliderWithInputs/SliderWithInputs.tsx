import { FC, useState, useEffect } from "react";
import { Form, FormInstance, InputNumber, Slider } from "antd";
import "./styles.module.scss";

interface SliderWithInputsProps {
  form: FormInstance;
  resetPagination: () => void;
  defaultMinValue: number;
  defaultMaxValue: number;
  namePostfix: string;
  label: string;
  className: string;
}

export const SliderWithInputs: FC<SliderWithInputsProps> = (
  {
    form,
    resetPagination,
    defaultMinValue,
    defaultMaxValue,
    namePostfix,
    label,
    className
  }) => {

  const [minValue, setMinValue] = useState(defaultMinValue);
  const [maxValue, setMaxValue] = useState(defaultMaxValue);
  const [sliderValue, setSliderValue] = useState<[number, number]>([defaultMinValue, defaultMaxValue]);

  useEffect(() => {
    resetPagination();
  }, [minValue, maxValue, sliderValue])

  const minValueChangeHandler = (newValue: number | null) => {
    const newInputValue = newValue === null ? 0 : newValue;
    form.setFieldValue(namePostfix.toLowerCase(), [newInputValue, sliderValue[1]]);
    setSliderValue((prevValue) => ([newInputValue, prevValue[1]]));
    setMinValue(newInputValue);
  };

  const maxValueChangeHandler = (newValue: number | null) => {
    const newInputValue = newValue === null ? 0 : newValue;
    form.setFieldValue(namePostfix.toLowerCase(), [sliderValue[0], newInputValue]);
    setSliderValue((prevValue) => ([prevValue[0], newInputValue]));
    setMaxValue(newInputValue);
  };

  const sliderChangeHandler = (value: [number, number]) => {
    form.setFieldValue(`min${namePostfix}`, value[0]);
    form.setFieldValue(`max${namePostfix}`, value[1]);
    setMinValue(value[0]);
    setMaxValue(value[1]);
    setSliderValue(value);
  };

  return (
    <Form.Item label={label}>
      <div className={className}>
        <Form.Item
          name={`min${namePostfix}`}>
          <InputNumber
            min={defaultMinValue}
            max={maxValue - 1}
            value={minValue}
            placeholder={`${defaultMinValue}`}
            onChange={minValueChangeHandler}
            prefix="from: "/>
        </Form.Item>
        <Form.Item
          name={`max${namePostfix}`}>
          <InputNumber
            min={minValue + 1}
            max={defaultMaxValue}
            value={maxValue}
            placeholder={`${defaultMaxValue}`}
            onChange={maxValueChangeHandler}
            prefix="to: "/>
        </Form.Item>
        <div className="w-full">
          <Form.Item
            name={namePostfix.toLowerCase()}
            initialValue={[minValue, maxValue]}
            className="m-t-0">
            <Slider
              range
              min={defaultMinValue}
              max={defaultMaxValue}
              step={1}
              onChange={sliderChangeHandler}/>
          </Form.Item>
        </div>
      </div>
    </Form.Item>
  )
}
