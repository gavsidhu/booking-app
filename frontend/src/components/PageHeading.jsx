import { Button, Dropdown } from "flowbite-react";
import { HiCog } from "react-icons/hi2";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function PageHeading({ heading, buttonText, onClick }) {
  const { logout } = useUser();
  const navigate = useNavigate();
  return (
    <div className='md:flex md:items-center md:justify-between'>
      <div className='min-w-0 flex-1'>
        <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
          {heading}
        </h2>
      </div>
      <div className='mt-4 flex space-x-5 items-center md:ml-4 md:mt-0'>
        <Button type='button' onClick={onClick}>
          {buttonText}
        </Button>
        <Dropdown label={<HiCog className='h-6 w-6' />} inline={true}>
          <Dropdown.Item onClick={() => navigate("/settings")}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
}
