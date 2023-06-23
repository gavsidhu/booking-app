import { useState } from "react";
import { Switch } from "@headlessui/react";
import {
  HiBell,
  HiCreditCard,
  HiCube,
  HiFingerPrint,
  HiUserCircle,
  HiUsers,
} from "react-icons/hi2";
import useUser from "../hooks/useUser";

import { Button, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import axios from "axios";
import PageHeading from "../components/PageHeading";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const secondaryNavigation = [
  { name: "General", href: "#", icon: HiUserCircle, current: true },
  { name: "Payments", href: "#", icon: HiCreditCard, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [showInputs, setShowInputs] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.firstName,
    last_name: user?.lastName,
    email: user?.email,
    username: user?.username,
  });
  const [active, setActive] = useState("General");

  const onChange = (e) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSave = async () => {
    try {
      setShowInputs(false);
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URl}/api/user/${user?.userId}/`,
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
      setUser({
        email: response.data.email,
        username: response.data.username,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        userId: response.data.id,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("There was an error updating your profile.");
    }
  };

  const setupPayments = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URl}/api/accounts/create_payment_account/`,
        {
          email: user.email,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      window.location.replace(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePayments = async () => {};

  return (
    <>
      <Navbar
        heading={"Settings"}
        buttonText={"Create booking type"}
        onClick={() => navigate("/new-booking-type")}
      />
      <div className='mx-auto max-w-7xl px-6 pb-24 sm:pb-40 lg:px-8'>
        <div className='mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8'>
          <aside className='flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20'>
            <nav className='flex-none px-4 sm:px-6 lg:px-0'>
              <ul
                role='list'
                className='flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col'
              >
                {secondaryNavigation.map((item) => (
                  <li key={item.name}>
                    <button
                      id={item.name}
                      onClick={() => setActive(item.name)}
                      className={classNames(
                        active === item.name
                          ? "bg-gray-50 text-black"
                          : "text-gray-700 hover:text-black hover:bg-gray-50",
                        "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold w-full"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-black"
                            : "text-gray-400 group-hover:text-black",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className='px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20'>
            {active === "General" && (
              <div
                className='mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none'
                id='general'
              >
                <div>
                  <div className='flex flex-row justify-between'>
                    <h2 className='text-xl font-semibold leading-7 text-gray-900'>
                      Profile
                    </h2>
                    {showInputs ? (
                      <div className='space-x-4'>
                        <button onClick={() => setShowInputs(!showInputs)}>
                          Cancel
                        </button>
                        <button onClick={handleSave}>Save</button>
                      </div>
                    ) : (
                      <button onClick={() => setShowInputs(!showInputs)}>
                        Edit
                      </button>
                    )}
                  </div>
                  <dl className='mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6'>
                    <div className='pt-6 sm:flex'>
                      <dt className='font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6'>
                        First name
                      </dt>
                      <dd className='mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto'>
                        {showInputs ? (
                          <TextInput
                            onChange={onChange}
                            name='first_name'
                            sizing={"sm"}
                            defaultValue={user?.firstName}
                          />
                        ) : (
                          <div className='text-gray-900'>{user?.firstName}</div>
                        )}
                      </dd>
                    </div>
                    <div className='pt-6 sm:flex'>
                      <dt className='font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6'>
                        Last name
                      </dt>
                      <dd className='mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto'>
                        {showInputs ? (
                          <TextInput
                            onChange={onChange}
                            name='last_name'
                            sizing={"sm"}
                            defaultValue={user?.lastName}
                          />
                        ) : (
                          <div className='text-gray-900'>{user?.lastName}</div>
                        )}
                      </dd>
                    </div>
                    <div className='pt-6 sm:flex'>
                      <dt className='font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6'>
                        Email address
                      </dt>
                      <dd className='mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto'>
                        {showInputs ? (
                          <TextInput
                            onChange={onChange}
                            name='email'
                            sizing={"sm"}
                            defaultValue={user?.email}
                          />
                        ) : (
                          <div className='text-gray-900'>{user?.email}</div>
                        )}
                      </dd>
                    </div>
                    <div className='pt-6 sm:flex'>
                      <dt className='font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6'>
                        Username
                      </dt>
                      <dd className='mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto'>
                        {showInputs ? (
                          <TextInput
                            onChange={onChange}
                            name='username'
                            sizing={"sm"}
                            defaultValue={user?.username}
                          />
                        ) : (
                          <div className='text-gray-900'>{user?.username}</div>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
            {active === "Payments" && (
              <div>
                <div className='space-y-8'>
                  <h2 className='text-xl font-semibold leading-7 text-gray-900'>
                    Payments
                  </h2>
                  <Button size='sm' onClick={setupPayments}>
                    Setup Payments
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
