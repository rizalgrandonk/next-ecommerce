import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import { getCost } from "@/lib/api";
import { localize, priceFormatter } from "@/lib/formater";
import LoadingSpinner from "../LoadingSpinner";
import { useRouter } from "next/router";

const CustomerForm = ({ onSubmit, allCities, allProvince, loadingPayment }) => {
  const { locale } = useRouter();

  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const watchProvice = watch("province");
  const watchCity = watch("city");
  const watchService = watch("service");

  const [isLoading, setIsLoading] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [shippingOptionList, setShippingOptionList] = useState([]);
  const [shippingPrice, setShippingPrice] = useState("");
  const [shippingDuration, setShippingDuration] = useState("");

  useEffect(() => {
    const fecthProvince = () => {
      setProvinceList(allProvince);
      setValue("province", allProvince[0].province_id);
    };

    fecthProvince();
  }, [setValue, allProvince]);

  useEffect(() => {
    const fecthCity = () => {
      const provinceCity = allCities.filter(
        (city) => city.province_id == watchProvice
      );
      const cities = provinceCity.map((city) => {
        return { ...city, label: `${city.type} ${city.city_name}` };
      });
      setCityList(cities);
      setValue("city", cities[0].city_id);
    };

    if (watchProvice) fecthCity();
  }, [watchProvice, setValue, allCities]);

  useEffect(() => {
    const fecthCost = async () => {
      setIsLoading(true);
      try {
        const data = await getCost(watchCity);
        const options = data[0].costs.map((option) => ({
          ...option,
          label: `JNE ${option.service}`,
        }));
        setShippingOptionList(options);
        setValue("service", options[0].service);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (watchCity) fecthCost();
  }, [watchCity, setValue]);

  useEffect(() => {
    const getShippingDetails = () => {
      const data = shippingOptionList.find(
        (option) => option.service == watchService
      );

      if (!data) {
        setShippingPrice(0);
        setShippingDuration(0);
        setValue("shipping_price", 0);
        return;
      }

      setShippingPrice(data.cost[0].value);
      setShippingDuration(data.cost[0].etd);

      setValue("shipping_price", data.cost[0].value);
    };

    if (watchService) getShippingDetails();
  }, [watchService, shippingOptionList, setValue]);

  return (
    <>
      <h2 className="text-3xl font-semibold text-gray-900 mb-10">
        {localize(locale, "customerData")}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap w-full">
          <div className="pr-2 md:px-4 mb-10 w-1/2">
            <FormInput
              id="first_name"
              type="text"
              label={localize(locale, "firstName")}
              register={register}
              errors={errors}
            />
          </div>
          <div className="pl-2 md:px-4 mb-10 w-1/2">
            <FormInput
              id="last_name"
              type="text"
              label={localize(locale, "lastName")}
              register={register}
              errors={errors}
            />
          </div>
          <div className="md:px-4 mb-8 w-full md:w-1/2">
            <FormInput
              id="email"
              type="email"
              label={localize(locale, "emailAddress")}
              register={register}
              errors={errors}
            />
            <span className="text-xs text-gray-800">
              {localize(locale, "activeEmail")}
            </span>
          </div>
          <div className="md:px-4 mb-10 w-full md:w-1/2">
            <FormInput
              id="phone"
              type="text"
              label={localize(locale, "phone")}
              register={register}
              errors={errors}
            />
          </div>
          <div className="md:px-4 mb-10 w-full md:w-full">
            <FormInput
              id="address"
              type="text"
              label={localize(locale, "detailAddress")}
              register={register}
              errors={errors}
            />
          </div>
          <div className="hidden md:px-4 mb-10 w-full md:w-full">
            <FormInput
              id="shipping_price"
              type="text"
              label={localize(locale, "shippingPrice")}
              register={register}
              errors={errors}
            />
          </div>

          <div className="md:px-4 mb-10 w-full md:w-1/2">
            <FormSelect
              id="province"
              label={localize(locale, "province")}
              list={provinceList}
              idField="province_id"
              labelField="province"
              register={register}
              errors={errors}
            />
          </div>

          <div className="md:px-4 mb-10 w-full md:w-1/2">
            <FormSelect
              id="city"
              label={localize(locale, "city")}
              list={cityList}
              idField="city_id"
              labelField="label"
              register={register}
              errors={errors}
            />
          </div>

          {isLoading ? (
            <div className="md:px-4 w-full h-32">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="md:px-4 mb-10 w-full md:w-1/2">
                <FormSelect
                  id="service"
                  label={localize(locale, "shippingOptions")}
                  list={shippingOptionList}
                  idField="service"
                  labelField="label"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="md:px-4 mb-10 w-full md:w-1/2">
                <div className="w-full">
                  <div className="flex w-full justify-between mb-4">
                    <p className="text-gray-600 text-sm">
                      {localize(locale, "shippingPrice")}
                    </p>
                    <span className="font-medium">
                      {priceFormatter.format(shippingPrice)}
                    </span>
                  </div>
                  <div className="flex w-full justify-between">
                    <p className="text-gray-600 text-sm">
                      {localize(locale, "estimatedShipping")}
                    </p>
                    <span className="font-medium">{`${shippingDuration} ${localize(
                      locale,
                      "days"
                    )}`}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="sumbit"
            className="flex justify-center items-center px-4 py-2 rounded-sm bg-primary hover:bg-opacity-90 text-white font-semibold text-center w-full md:w-1/2  cursor-pointer disabled:bg-gray-400 disabled:pointer-events-none"
            disabled={isLoading || loadingPayment}
          >
            {loadingPayment ? (
              <>
                <span className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-t-2 border-white mr-4"></span>
                {localize(locale, "processing")}
              </>
            ) : (
              localize(locale, "next")
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomerForm;
