import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@store/store";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Pagination } from "antd";
import { debounce, pickBy } from "lodash";
import { getCategoriesList, getCategoriesStatus } from "@store/categories";
import {
  fetchCatalog,
  getCatalogFilterParams,
  getCatalogList,
  getCatalogLoadStatus,
  getCatalogTotalCount
} from "@store/catalog";
import { SortPanel } from "./SortPanel";
import { FilterForm } from "./FilterForm";
import { BookCard, Loader } from "@common";
import { LOAD_STATUSES, SearchParams } from "@types";
import "./styles.module.scss";
import { ROUTES } from "@router";

export const Catalog: FC = () => {
  const [current, setCurrent] = useState(1);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const catalogRef = useRef<HTMLElement>(null);
  const [form] = Form.useForm();
  const location = useLocation();
  const text = location.state?.text || "";

  const catalogList = useSelector(getCatalogList);
  const catalogFilterParams = useSelector(getCatalogFilterParams);
  const catalogTotalCount = useSelector(getCatalogTotalCount);
  const catalogStatus = useSelector(getCatalogLoadStatus);
  const dispatch = useAppDispatch();

  const categoriesList = useSelector(getCategoriesList);
  const categoriesStatus = useSelector(getCategoriesStatus);
  const categoriesCheckboxOptions = categoriesList.map(({ id, label }) => {
    return { value: id, label };
  });

  const { categoryType } = useParams();
  const categoryTypeIds = categoriesList.find((category) => category.type === categoryType)?.id
  const navigate = useNavigate();

  useEffect(() => {
    if ( location.pathname === "/catalog" && !isFirstLoading && !location.state?.text) {
      form.resetFields();
      dispatch(fetchCatalog());
    }
    if ( location.state?.text ) {
      form.resetFields();
    }
    form.setFieldValue("price", [catalogFilterParams.minPrice, catalogFilterParams.maxPrice]);
    form.setFieldValue("year", [catalogFilterParams.minYear, catalogFilterParams.maxYear]);
  }, [location.key]);

  useEffect(() => {
    if (categoryTypeIds) {
      form.setFieldValue("categoryTypeIds", categoryTypeIds);
      dispatch(fetchCatalog({ categoryTypeIds }));
    } else if (text) {
      dispatch(fetchCatalog({ text }));
    } else {
      dispatch(fetchCatalog());
    }
  }, [categoryTypeIds, text]);

  useEffect(() => {
    if (categoryTypeIds && categoryTypeIds !== form.getFieldValue("categoryTypeIds")) {
      navigate(ROUTES.CATALOG);
    }
  }, [form.getFieldValue("categoryTypeIds")]);

  useEffect(() => {
    if (catalogStatus === LOAD_STATUSES.LOADED) {
      setIsFirstLoading(false);
    }
  }, [catalogStatus])

  const catalogFilteringHandler = (text: string = "") => {
    let filterValues: SearchParams = { ...form.getFieldsValue(), text }
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
    dispatch(fetchCatalog({ ...searchParams }));
  };

  const debouncedCatalogFiltering = useMemo(
    () => debounce((text: string) => catalogFilteringHandler(text), 1500),
    []);

  const scrollToCatalogStart = () => {
    if (window.pageYOffset > 300) {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const debouncedScrollToStart = useMemo(
    () => debounce(() => scrollToCatalogStart(), 1000),
    []);

  const formFieldsChangeHandler = (text: string) => {
    debouncedCatalogFiltering(text);
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
            ((catalogStatus === LOAD_STATUSES.ERROR || categoriesStatus === LOAD_STATUSES.ERROR) && isFirstLoading) &&
            <div className="col-span-2 p-15 mt-[70px] bg-red-600/10 border border-red-600/30 rounded">
              <p className="pl-10 font-sans text-2xl text-blue cursor-default">
                Failed to fetch data, please reload the page or try again later.
                <span
                  className="text-red-800 hover:text-red-600 cursor-pointer"
                  onClick={() => navigate(-1)}> Return Back</span>
              </p>
            </div>
          }
          {
            ((catalogStatus === LOAD_STATUSES.LOADING || catalogStatus === LOAD_STATUSES.UNKNOWN) && isFirstLoading) ?
              <Loader type="sortPanel"/> :
              <div className="col-start-2 flex justify-between ">
                {
                  text &&
                  <p
                    className="pl-20 pt-25 font-sans text-lg text-blue cursor-default">
                    {`Found ${catalogTotalCount} items for "${text}", `}
                    <Link
                      to={ROUTES.CATALOG}
                      state={{text: null}}
                      className="text-gray hover:text-jeans">
                      see all catalog
                    </Link>
                  </p>
                }
                <SortPanel
                  form={form}
                  onFormFieldChange={debouncedCatalogFiltering}
                  resetPagination={resetPagination}
                  className="flex grow justify-end gap-20 pt-20"/>
              </div>

          }
          {
            ((catalogStatus === LOAD_STATUSES.LOADING || catalogStatus === LOAD_STATUSES.UNKNOWN) && isFirstLoading) ?
              <Loader type="filterForm"/> :
              <FilterForm
                form={form}
                onReset={catalogFilteringHandler}
                resetPagination={resetPagination}
                filterParams={catalogFilterParams}
                checkboxOptions={categoriesCheckboxOptions}
                className="sticky row-start-2 row-span-1 top-20 self-start p-20 border border-lightGray mb-[52px] rounded"/>
          }
          {
            (catalogStatus === LOAD_STATUSES.UNKNOWN || catalogStatus === LOAD_STATUSES.LOADING) &&
            <Loader type="catalog" itemsCount={(form.getFieldValue("limit") || 20)} />
          }
          {
            (catalogStatus === LOAD_STATUSES.LOADED && catalogTotalCount === 0) &&
            <div className="w-full pl-20">
              <div className="p-15 bg-jeans/10 border border-jeans/30 rounded">
                <p className="pl-10 font-sans text-xl text-blue cursor-default">
                  Currently empty, but we will add new products soon. Try changing the request or
                  <span
                    className="pl-[5px] text-jeans/80 hover:text-jeans cursor-pointer"
                    onClick={() => navigate(0)}>go back</span>
                </p>
              </div>
            </div>
          }
          {
            (catalogStatus === LOAD_STATUSES.ERROR && !isFirstLoading) &&
            <div className="w-full pl-20">
              <div className="p-15 bg-red-600/10 border border-red-600/30 rounded">
                <p className="pl-10 font-sans text-xl text-blue cursor-default">
                  An error occurred, please try again later
                </p>
              </div>
            </div>
          }
          {
            (catalogStatus === LOAD_STATUSES.LOADED && catalogTotalCount > 0) &&
            <ul className="grid grid-cols-4 pl-20 gap-30">
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
            onValuesChange={() => formFieldsChangeHandler(text)}
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
