import { FC, useState, ChangeEvent } from "react";

export const NewsletterBlock: FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handlerSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);

    setInputValue("");
  }

  return (
    <section className="flex justify-center items-center w-full py-90">
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
            className="w-[525px] px-25 font-sans font-lg text-blue outline-0 placeholder:text-gray"
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
