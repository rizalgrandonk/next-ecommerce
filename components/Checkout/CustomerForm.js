import { useEffect, useState } from "react";
import FormInput from "../FormInput";

import { getProvince, getCity, getCost } from "../../lib/api";
import { priceFormatter } from "../../lib/formater";

const CustomerForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [provinceList, setProvinceList] = useState([]);
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const [shippingOptionList, setShippingOptionList] = useState([]);
  const [shippingPrice, setShippingPrice] = useState("");
  const [shippingDuration, setShippingDuration] = useState("");

  const fecthProvince = async () => {
    const data = await getProvince();

    setProvinceList(data);
    setProvince(data[0].province_id);
  };

  useEffect(() => {
    fecthProvince();
  }, []);

  useEffect(() => {
    const fecthCity = async () => {
      const data = await getCity(`?province=${province}`);

      setCityList(data);
      setCity(data[0].city_id);
    };

    if (province) fecthCity();
  }, [province]);

  useEffect(() => {
    const fecthCost = async () => {
      const data = await getCost(city);

      setShippingOptionList(data[0].costs);
      setShippingOption(data[0].costs[0].service);
    };

    if (city) fecthCost();
  }, [city]);

  useEffect(() => {
    const getShippingDetails = () => {
      const data = shippingOptionList.find(
        (option) => option.service == shippingOption
      );

      setShippingPrice(data.cost[0].value);
      setShippingDuration(data.cost[0].etd);
    };

    if (shippingOption) getShippingDetails();
  }, [shippingOption, shippingOptionList]);

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-900 mb-10">
        Customer Shipping Data
      </h1>
      <form>
        <div className="flex flex-wrap w-full">
          <div className="pr-2 md:px-4 mb-10 w-1/2">
            <FormInput
              id="first-name"
              type="text"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="pl-2 md:px-4 mb-10 w-1/2">
            <FormInput
              id="last-name"
              type="text"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="md:px-4 mb-8 w-full md:w-1/2">
            <FormInput
              id="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="text-xs text-gray-500">Use an active email</span>
          </div>
          <div className="md:px-4 mb-10 w-full md:w-1/2">
            <FormInput
              id="phone-number"
              type="text"
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="md:px-4 mb-10 w-full md:w-full">
            <FormInput
              id="address"
              type="text"
              label="Detail Address (District, Street Name, etc)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="md:px-4 mb-10 w-full md:w-1/2">
            <div className="w-full">
              <label htmlFor="province" className="text-gray-600 text-sm">
                Select Province
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                id="province"
                className="h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
                required
              >
                {provinceList.map((province) => (
                  <option
                    key={province.province_id}
                    value={province.province_id}
                  >
                    {province.province}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:px-4 mb-10 w-full md:w-1/2">
            <div className="w-full">
              <label htmlFor="city" className="text-gray-600 text-sm">
                Select City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                id="city"
                className="h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
                required
              >
                {cityList.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {`${city.type} ${city.city_name}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:px-4 mb-10 w-full md:w-1/2">
            <div className="w-full">
              <label htmlFor="city" className="text-gray-600 text-sm">
                Select Shipping Option (JNE)
              </label>
              <select
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
                id="shipping-option"
                className="h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
                required
              >
                {shippingOptionList.map((option) => (
                  <option key={option.service} value={option.service}>
                    {option.service}
                  </option>
                ))}
              </select>
            </div>
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
                <p className="text-gray-600 text-sm">Estimated Shipping Time</p>
                <span className="font-medium">{shippingDuration} Days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="sumbit"
            className="px-4 py-2 rounded bg-primary hover:bg-opacity-90 text-white font-semibold text-center block w-full md:w-1/2 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary focus:ring-opacity-80 cursor-pointer"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomerForm;
