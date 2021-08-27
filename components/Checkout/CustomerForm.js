import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import { getCost } from "@/lib/api";
import { priceFormatter } from "@/lib/formater";
import LoadingSpinner from "../LoadingSpinner";

const CustomerForm = ({ onSubmit, allCities, allProvince, loadingPayment }) => {
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

        setShippingOptionList(data[0].costs);
        setValue("service", data[0].costs[0].service);
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

      setShippingPrice(data.cost[0].value);
      setShippingDuration(data.cost[0].etd);

      setValue("shipping_price", data.cost[0].value);
    };

    if (watchService) getShippingDetails();
  }, [watchService, shippingOptionList, setValue]);

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-900 mb-10">
        Customer Shipping Data
      </h1>
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap w-full">
          <div className="pr-2 md:px-4 mb-10 w-1/2">
            <FormInput
              id="first_name"
              type="text"
              label="First Name"
              register={register}
              errors={errors}
            />
          </div>
          <div className="pl-2 md:px-4 mb-10 w-1/2">
            <FormInput
              id="last_name"
              type="text"
              label="Last Name"
              register={register}
              errors={errors}
            />
          </div>
          <div className="md:px-4 mb-8 w-full md:w-1/2">
            <FormInput
              id="email"
              type="email"
              label="Email"
              register={register}
              errors={errors}
            />
            <span className="text-xs text-gray-500">Use an active email</span>
          </div>
          <div className="md:px-4 mb-10 w-full md:w-1/2">
            <FormInput
              id="phone"
              type="text"
              label="Phone Number"
              register={register}
              errors={errors}
            />
          </div>
          <div className="md:px-4 mb-10 w-full md:w-full">
            <FormInput
              id="address"
              type="text"
              label="Detail Address (District, Street Name, etc)"
              register={register}
              errors={errors}
            />
          </div>
          <div className="hidden md:px-4 mb-10 w-full md:w-full">
            <FormInput
              id="shipping_price"
              type="text"
              label="Shipping Price"
              register={register}
              errors={errors}
            />
          </div>

          <div className="md:px-4 mb-10 w-full md:w-1/2">
            <FormSelect
              id="province"
              label="Province"
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
              label="City"
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
                  label="Shipping Option (JNE)"
                  list={shippingOptionList}
                  idField="service"
                  labelField="service"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="md:px-4 mb-10 w-full md:w-1/2">
                <div className="w-full">
                  <div className="flex w-full justify-between mb-4">
                    <p className="text-gray-600 text-sm">Shipping Price</p>
                    <span className="font-medium">
                      {priceFormatter.format(shippingPrice)}
                    </span>
                  </div>
                  <div className="flex w-full justify-between">
                    <p className="text-gray-600 text-sm">
                      Estimated Shipping Time
                    </p>
                    <span className="font-medium">{shippingDuration} Days</span>
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
                Processing
              </>
            ) : (
              "NEXT"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomerForm;
