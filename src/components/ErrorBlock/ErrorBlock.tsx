import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ErrorImg from "@img/404.svg";

export const ErrorBlock: FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  }

  return (
    <section className="flex flex-col items-center gap-40 w-full py-200 bg-error-page bg-cover">
      <ErrorImg/>
      <div className="flex flex-col items-center gap-15 w-[600px]">
        <h2 className="font-serif font-bold text-[40px] leading-[52px] text-blue cursor-default">
          Page not Found!!!
        </h2>
        <p className="font-sans text-xl leading-[32px] text-gray text-center cursor-default">
          The page you are looking for doesn't exist. Please try searching for some other page, or return to the website's homepage to find what you're looking for.
        </p>
      </div>
      <button
        type="button"
        onClick={goBack}
        className="w-230 h-65 bg-yellow font-serif font-bold text-lg leading-[24px] text-blue hover:bg-gold">
        Return Back
      </button>
    </section>
  );
}
