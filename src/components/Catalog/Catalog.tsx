import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Pagination } from "antd";
import { debounce, pickBy } from "lodash";
import classNames from "classnames";
import { getCategoriesList } from "@store/categories";
import {
  fetchCatalog,
  getCatalogFilterParams,
  getCatalogList,
  getCatalogLoadStatus,
  getCatalogTotalCount
} from "@store/catalog";
import { SortPanel } from "./SortPanel";
import { FilterForm } from "./FilterForm";
import { BookCard } from "@common";
import { bookLoader, pulse } from "@loaders";
import { LOAD_STATUSES, SearchParams } from "@types";

export const Catalog: FC = () => {
  const [current, setCurrent] = useState(1);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const catalogRef = useRef<HTMLElement>(null);
  const [form] = Form.useForm();

  const categoriesList = useSelector(getCategoriesList);
  // const categoriesStatus = useSelector(getCategoriesStatus);
  const categoriesCheckboxOptions = categoriesList.map(({ id, label }) => {
    return { value: id, label };
  });

  const catalogList = useSelector(getCatalogList);
  const catalogFilterParams = useSelector(getCatalogFilterParams);
  const catalogTotalCount = useSelector(getCatalogTotalCount);
  const catalogStatus = useSelector(getCatalogLoadStatus);
  const dispatch = useDispatch();

  const sortPanelWrapStyles = "col-span-full flex justify-end gap-20 pt-20";
  const filterFormWrapStyles = "sticky row-start-2 row-span-1 top-20 self-start p-20 border border-lightGray mb-[52px] rounded";
  const catalogWrapStyles = "grid grid-cols-4 pl-20 gap-30";

  const sortPanelLoader =
    <div className={classNames(sortPanelWrapStyles, "py-20 animate-pulse")}>
      <div className={classNames("w-[277px] h-[32px]", pulse)}></div>
      <div className={classNames("w-[132px] h-[32px]", pulse)}></div>
    </div>;

  const filterFormLoader =
    <div className={classNames(filterFormWrapStyles, "flex-col gap-20 h-[840px] border-0 animate-pulse", pulse)}></div>;

  const booksListLoader = new Array(form.getFieldsValue().limit || 20);
  booksListLoader.fill(bookLoader);

  const catalogLoader =
    <div  className={classNames(catalogWrapStyles, "animate-pulse")}>
      {
        booksListLoader.map((item, index) => (
          <div key={index}>
            {item}
          </div>
        ))
      }
    </div>;

  useEffect(() => {
    dispatch(fetchCatalog({}) as any);
  }, []);

  useEffect(() => {
    if ( catalogStatus === LOAD_STATUSES.LOADED ) {
      setIsFirstLoading(false);
    }
  }, [catalogStatus])

  const catalogFilteringHandler = () => {
    let filterValues: SearchParams = { ...form.getFieldsValue() }
    if (filterValues.sort) {
      const [sortBy, sortDirection] = filterValues.sort!.split(":");
      filterValues = { ...filterValues, sortBy, sortDirection, sort: undefined };
    }
    if (filterValues.offset) {
      filterValues.offset = ((filterValues.offset - 1) * (filterValues.limit || 20));
    }
    const searchParams = pickBy(filterValues, (value) => {
      return value
    });
    dispatch(fetchCatalog(searchParams) as any);
  };

  const debouncedCatalogFiltering = useMemo(
    () => debounce(() => catalogFilteringHandler(), 1500),
    []);

  const scrollToCatalogStart = () => {
    if (window.pageYOffset > 300) {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const debouncedScrollToStart = useMemo(
    () => debounce(() => scrollToCatalogStart(), 1000),
    []);

  const formFieldsChangeHandler = () => {
    debouncedCatalogFiltering();
    debouncedScrollToStart();
  };

  const paginationChangeHandler = (page: number) => {
    setCurrent(page);
  };

  const resetPagination = () => {
    setCurrent(1)
    form.setFieldValue('offset', 1);
  };

  return (
    <section
      ref={catalogRef}
      className="f-full flex justify-center mt-20">
        <Form.Provider>
          <div className="relative grid grid-cols-catalog w-cont">
            {
              isFirstLoading ?
                sortPanelLoader :
                <SortPanel
                  form={form}
                  onFormFieldChange={debouncedCatalogFiltering}
                  resetPagination={resetPagination}
                  className={sortPanelWrapStyles}/>
            }
            {
              isFirstLoading ?
                filterFormLoader :
                <FilterForm
                  form={form}
                  onReset={catalogFilteringHandler}
                  resetPagination={resetPagination}
                  filterParams={catalogFilterParams}
                  checkboxOptions={categoriesCheckboxOptions}
                  className={filterFormWrapStyles}/>
            }
            {
              (catalogStatus === LOAD_STATUSES.UNKNOWN || catalogStatus === LOAD_STATUSES.LOADING) &&
              catalogLoader
            }
            {
              catalogStatus === LOAD_STATUSES.LOADED &&
              <ul className={catalogWrapStyles}>
                {
                  catalogList?.map((book) => {
                    return (
                      <li key={book.id}>
                        <BookCard
                          book={book}/>
                      </li>
                    );
                  })
                }
              </ul>
            }
            <Form
              form={form}
              name="pagination"
              onValuesChange={formFieldsChangeHandler}
              className="col-start-2 flex justify-center pt-20">
              <Form.Item
                name="offset">
                <Pagination
                  current={current}
                  pageSize={form.getFieldsValue().limit || 20}
                  total={catalogTotalCount}
                  hideOnSinglePage={true}
                  showSizeChanger={false}
                  onChange={paginationChangeHandler}/>
              </Form.Item>
            </Form>
          </div>
        </Form.Provider>
    </section>
  );
}
