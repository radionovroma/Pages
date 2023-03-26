import { FC } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { Api } from "@api";
import { useNotification } from "@hooks";
import { actions } from "@store/user";
import LogoSvg from "@img/logo-xl.svg";

export const LoginBlock: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const dispatch = useDispatch();
  const api = new Api();
  const { openNotification } = useNotification();

  const onFinish = (values: any) => {
    api.login(values)
      .then(data => {
        openNotification("success", "Successful login");
        dispatch(actions.signIn(data) as any);
        navigate(fromPage, { replace: true });
      })
      .catch(e => openNotification("error", e.message || 'Something went wrong.'));
    dispatch(actions.signIn(values) as any);
  };

  return (
    <section className="flex justify-center w-full py-90">
      <div className="flex justify-between w-cont">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="w-600 border border-lightGray p-50 login-form">
          <Form.Item
            name="login"
            label="Email: "
            rules={[{ required: true, message: "Email is required." }]}>
            <Input
              placeholder="Email address"/>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password: "
            rules={[{ required: true, message: 'Please input your password', }]}>
            <Input.Password
              placeholder="Password"/>
          </Form.Item>
          <div
            className="flex gap-20 w-full buttons-bar">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit">
                Log In
              </Button>
            </Form.Item>
            <Link
              to="../registration">
              Sign Up
            </Link>
          </div>
        </Form>
        <div
          className="flex flex-col justify-center items-center w-600">
          <LogoSvg/>
          <h2 className="mt-10 font-serif font-bold text-4xl text-blue cursor-default">
            Welcome back
          </h2>
          <p className="mt-10 font-sans text-lg text-gray cursor-default">
            Don't have an account?
          </p>
          <Link
            to="../registration"
            className="mt-[5px] font-sans text-lg text-yellow/80 underline hover:text-gold">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
