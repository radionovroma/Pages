import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@router";
import { pickBy } from "lodash";
import { Button, Checkbox, DatePicker, Form, Input, Radio, Tag } from "antd";
import { Api } from "@api";
import { useNotification } from "@hooks";
import { Loader } from "@common";
import { getCategoriesList, getCategoriesStatus } from "@store/categories";
import { LOAD_STATUSES } from "@types";
import LogoSvg from "@img/logoXl.svg";
import "./stules.module.scss";

export const RegistrationBlock: FC = () => {
  const api = new Api();
  const { openNotification } = useNotification();
  const [form] = Form.useForm();
  const { CheckableTag } = Tag;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const categories = useSelector(getCategoriesList);
  const categoriesStatus = useSelector(getCategoriesStatus);

  const handleChange = (tag: string, checked: boolean) => {
    setSelectedTags((prevState) => checked ? [...prevState, tag] : [...prevState.filter(t => t !== tag)]);
  };

  useEffect(() => {
    form.setFieldValue("interests", selectedTags);
  }, [selectedTags])

  const onFinish = (values: any) => {
    const newUserInfo = pickBy(values, (value) => {
      return value
    });
    api.registration(newUserInfo)
      .then(() => {
        openNotification('success', `Registration completed successfully`);
        navigate(ROUTES.LOGIN, { replace: true });
      })
      .catch(e => openNotification('error', e.message));
  };

  return (
    <section className="flex justify-center w-full py-90">
      <div className="flex justify-between w-cont">
        <div
          className="flex flex-col justify-center items-center w-600">
          <LogoSvg/>
          <h2 className="mt-10 font-serif font-bold text-4xl text-blue cursor-default">
            Create your Pages account
          </h2>
          <p className="mt-10 font-sans text-lg text-gray cursor-default">
            Already have an account?
          </p>
          <Link
            to={ROUTES.LOGIN}
            className="mt-[5px] font-sans text-lg text-yellow/70 underline hover:text-gold">
            Log in
          </Link>
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="w-600 border border-lightGray p-50 registration-form">
          <Form.Item
            name="name"
            label="First name :"
            rules={[
              { pattern: new RegExp(/^[a-zа-яA-ZА-Я]{2,}$/), message: "The first name must be two characters" },
              { required: true, message: "First name is required." }]}>
            <Input
              placeholder="First name"/>
          </Form.Item>
          <Form.Item
            name="surname"
            label="Last name :"
            rules={[{ pattern: new RegExp(/^[a-zа-яA-ZА-Я]{2,}$/), message: "The last name must be two characters" }]}>
            <Input
              placeholder="Last name"/>
          </Form.Item>
          <Form.Item
            name="login"
            label="Email: "
            rules={[
              { pattern: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i), message: "Wrong email format" },
              { required: true, message: "Email is required." }]}>
            <Input
              placeholder="Email address"/>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password: "
            rules={[
              { pattern: new RegExp(/^[a-zа-яA-ZА-Я0-9]{6,}$/), message: "Weak password" },
              { required: true, message: 'Please input your password', }]}
            hasFeedback>
            <Input.Password
              placeholder="Password"/>
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password: "
            dependencies={['password']}
            hasFeedback
            rules={[{ required: true, message: 'Please confirm your password', },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match'));
                },
              }),
            ]}>
            <Input.Password
              placeholder="Confirm password"/>
          </Form.Item>
          <Form.Item
            name="birthAt"
            label="Birth date: "
            rules={[{ required: true, message: "First name is required." }]}>
            <DatePicker
              placeholder="YYYY-MM-DD"
              disabledDate={d => !d || d.isBefore("1930-01-01") || d.isAfter(new Date())}/>
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender: "
            className="radio-group">
            <Radio.Group
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}/>
          </Form.Item>
          <Form.Item
            name="interests"
            label="Favorite categories: ">
            <div className="favorites">
              {
                categoriesStatus === LOAD_STATUSES.LOADING &&
                <Loader type="favorites"/>
              }
              {
                categoriesStatus === LOAD_STATUSES.LOADED &&
                categories.filter(item => (item.id !== '13' && item.id !== '14' && item.id !== '15'))
                  .map(item => (
                    <CheckableTag
                      key={item.id}
                      checked={selectedTags.includes(item.id)}
                      onChange={(checked) => handleChange(item.id, checked)}>
                      {item.label}
                    </CheckableTag>
                  ))
              }
            </div>
          </Form.Item>
          <Form.Item
            name="isSubscribe"
            initialValue={true}
            valuePropName="checked">
            <Checkbox
              defaultChecked={true}>
              Sign up for our newsletter
            </Checkbox>
          </Form.Item>
          <div
            className="flex gap-20 w-full buttons-bar">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
            <Link
              to={ROUTES.MAIN}>
              Cancel
            </Link>
          </div>
        </Form>
      </div>
    </section>
  );
}
