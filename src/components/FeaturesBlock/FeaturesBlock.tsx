import { FC } from "react";
import PaymentSvg from "@img/payment-icon.svg";
import ShippingSvg from "@img/shipping-icon.svg";
import SatisfactionSvg from "@img/satisfaction-icon.svg";

export const FeaturesBlock: FC = () => {
  const features = [
    { label: "secure payment", icon: <PaymentSvg/> },
    { label: "free shipping", icon: <ShippingSvg/> },
    { label: "100% satisfaction", icon: <SatisfactionSvg/> },
  ]

  return (
    <section className="flex justify-center items-center w-full py-90 bg-yellow">
      <div className="flex gap-200">
        {features.map(item =>
          <div
            key={item.label}
            className="flex flex-col items-center gap-30">
            <div className="flex justify-center items-center w-[80px] h-[80px] bg-blue">
              {item.icon}
            </div>
            <h2 className="font-serif text-3xl font-bold text-blue capitalize">
              {item.label}
            </h2>
          </div>
        )}
      </div>
    </section>
  )
}
