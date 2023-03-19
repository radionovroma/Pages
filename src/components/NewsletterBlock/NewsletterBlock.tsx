import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from 'antd';
import { getSubscribeResponse, getSubscribeData, getSubscribeStatus, subscribe } from "@store/newsletterSubscription";
import { LOAD_STATUSES } from "@types";

type NotificationType = 'info' | 'warning';

export const NewsletterBlock: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const subscribeResponse = useSelector(getSubscribeResponse);
  const subscriberData = useSelector(getSubscribeData);
  const subscribeStatus = useSelector(getSubscribeStatus);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message: string) => {
    api[type]({
      message,
      placement: "bottomRight",
      duration: 10,
      style: {
        width: 400,
        borderRadius: 0,
      }
    });
  };

  const handlerSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(subscribe(inputValue) as any);

    setInputValue("");
  }

  useEffect(() => {
    if (subscribeStatus === LOAD_STATUSES.LOADED) {
      openNotificationWithIcon('info', `Subscribed by ${subscriberData?.email}`);
    } else if (subscribeStatus === LOAD_STATUSES.ERROR && subscribeResponse !== undefined) {
      openNotificationWithIcon('warning', subscribeResponse);
    }
  }, [subscribeStatus])

  return (
    <section className="flex justify-center items-center w-full py-90">
      { contextHolder }
      <div className="flex flex-col gap-30 w-cont p-90 bg-yellow">
        <h2 className="relative pb-20 font-serif font-bold text-5xl text-center text-blue cursor-default
            after:absolute after:bottom-0 after:left-1/2 after:-translate-x-2/4 after:w-50 after:h-[2px] after:bg-blue">
          Sign up for our newsletter
        </h2>
        <p className="font-sans text-lg leading-8 text-center text-blue cursor-default">
          Get $5 off your next purchase, plus, be the first to know about sales, new arrivals and more.
        </p>
        <form
          onSubmit={handlerSubmit}
          className="flex justify-center gap-15">
          <input
            type="email"
            name="email"
            value={inputValue}
            onChange={(e) => (setInputValue(e.target.value))}
            placeholder="Your Email id..."
            required
            pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3,4}$/"
            className="w-[525px] px-25 border border-white font-sans font-lg text-blue outline-0 placeholder:text-gray hover:border-blue focus-visible:border-blue"
          />
          <button
            type="submit"
            className="flex justify-center items-center w-300 h-50 font-serif font-bold text-lg text-white bg-blue">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
