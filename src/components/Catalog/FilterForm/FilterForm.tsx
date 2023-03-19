import React, { FC } from "react";
import { Form, FormInstance, Checkbox, Button, Switch } from "antd";
import { SliderWithInputs } from "./SliderWithInputs";
import { FilterParams } from "@types";

interface FilterFormProps {
  form: FormInstance;
  onReset: ReturnType<(...args: any[]) => any> | undefined;
  resetPagination: () => void;
  filterParams: FilterParams;
  checkboxOptions: { value: string, label: string }[];
  className: string;
}

export const FilterForm: FC<FilterFormProps> = (
  {
    form,
    onReset,
    resetPagination,
    filterParams,
    checkboxOptions,
    className
  }) => {
  const filtersResetHandler = () => {
    const { sort, limit } = form.getFieldsValue();
    form.resetFields();
    form.setFieldValue("sort", sort);
    form.setFieldValue("limit", limit);
    form.setFieldValue("price", [filterParams.minPrice, filterParams.maxPrice]);
    form.setFieldValue("year", [filterParams.minYear, filterParams.maxYear]);
    resetPagination();
    onReset();
  }

  return (
    <Form
      form={form}
      name="filter"
      layout="vertical"
      className={className}>
      <Form.Item
        name="categoryTypeIds"
        label="Categories:">
        <Checkbox.Group
          options={checkboxOptions}
          onChange={resetPagination}
          className="flex flex-col"/>
      </Form.Item>
      <SliderWithInputs
        form={form}
        resetPagination={resetPagination}
        defaultMinValue={filterParams.minPrice}
        defaultMaxValue={filterParams.maxPrice}
        namePostfix="Price"
        label="Price, $: "
        className="flex flex-wrap gap-10"/>
      <SliderWithInputs
        form={form}
        resetPagination={resetPagination}
        defaultMinValue={filterParams.minYear}
        defaultMaxValue={filterParams.maxYear}
        namePostfix="Year"
        label="Publication date:"
        className="flex flex-wrap gap-10"/>
      <Form.Item
        name="stock"
        label="In stock:"
        valuePropName="checked"
        className="antd-form-item__switch">
        <Switch
          onChange={resetPagination}/>
      </Form.Item>
      <Form.Item
        className="antd-form-item__buttons">
        <Button
          type="default"
          onClick={filtersResetHandler}
          className="w-full">
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}
