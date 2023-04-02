import { FC } from "react";
import { DebouncedFunc } from "lodash";
import classNames from "classnames";
import { Form, FormInstance, Select } from "antd";
import "./styles.module.scss";

enum SORT_BY {
  DATE_PUBLISHED_DESC = "date_published:desc",
  PRICE_ASC = "price:asc",
  PRICE_DESC = "price:desc",
  TITLE_ASC="title:asc",
  TITLE_DESC="title:desc",
  ID_ASC = "id:asc",
}

interface SortPanelProps {
  form: FormInstance;
  onFormFieldChange:  DebouncedFunc<() => void>;
  resetPagination: () => void;
  className: string;
}

export const SortPanel: FC<SortPanelProps> = ({form, onFormFieldChange, resetPagination, className}) => {
  const sortParamsChangeHandler = (value: SORT_BY) => {
    const [sortBy, sortDirection] = value.split(":");
    form.setFieldValue("sortBy", sortBy);
    form.setFieldValue("sortDirection", sortDirection);
    resetPagination();
    onFormFieldChange.flush();
  };

  const limitChangeHandler = () => {
    resetPagination();
    onFormFieldChange.flush();
  }

  return (
    <Form
      form={form}
      name="sort"
      className={classNames(className, "sort-panel")}>
      <Form.Item
        name="sort"
        label="Sort by:"
        initialValue={SORT_BY.ID_ASC}>
        <Select
          options={[
            { value: SORT_BY.DATE_PUBLISHED_DESC, label: "New to Old" },
            { value: SORT_BY.TITLE_ASC, label: "Title: A-Z"},
            { value: SORT_BY.TITLE_DESC, label: "Title: Z-A"},
            { value: SORT_BY.PRICE_ASC, label: "Price: Lowest First" },
            { value: SORT_BY.PRICE_DESC, label: "Price: Highest First" },
            { value: SORT_BY.ID_ASC, label: "Trust you" },]}
          onChange={(value: SORT_BY) => sortParamsChangeHandler(value)}
          className="ant-form-item-control-sort"/>
      </Form.Item>
      <Form.Item
        name="limit"
        label="Show: "
        initialValue={20}>
        <Select
          options={[
            { value: 20, label: "20" },
            { value: 60, label: "60" },
            { value: 100, label: "100" },
          ]}
          onChange={limitChangeHandler}
          style={{ width: 70 }}
        />
      </Form.Item>
    </Form>
  );
}
