import {
  HiOutlineClock,
  HiOutlineLink,
  HiOutlineExternalLink,
  HiOutlineShare,
  HiOutlineCreditCard,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
export default function BookingTypeCard({
  name,
  description,
  duration,
  color,
  id,
  onClick,
  payment_required,
  price,
  showLink,
}) {
  const { user } = useUser();
  const handleCopyLink = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_FRONTEND_URL}/${user.username}/bookings`
    );
  };
  return (
    <div
      id={id}
      onClick={onClick}
      className='relative block overflow-hidden rounded-lg card-shadow-2 border border-gray-100 p-4 sm:p-6 lg:p-8 hover:cursor-pointer hover:!shadow-none'
      style={{
        boxShadow: `3.26037px 3.26037px 0 ${color}`,
        border: `2px solid ${color}`,
      }}
    >
      <div className=''>
        <div className='flex flex-row items-center justify-between'>
          <h3 className='text-lg font-bold text-gray-900 sm:text-xl'>{name}</h3>
          <dl className='flex gap-4 sm:gap-6'>
            <div className='flex flex-row items-center space-x-1'>
              <dt className='text-sm font-medium text-gray-600'>
                <HiOutlineClock className='h-4 w-4' />
              </dt>
              <dd className='text-sm text-gray-500'>{duration}m</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className='mt-4'>
        <p className='max-w-[40ch] text-sm text-gray-500'>{description}</p>
      </div>
      {showLink && (
        <div className='mt-4'>
          <Link
            to={`/${user.username}/bookings`}
            className='max-w-[40ch] text-sm text-gray-500'
            style={{
              cursor: "pointer",
              transition: "color 0.3s",
              color: "inherit",
            }}
            // Prevent div onClick function when lik is clicked
            onClick={(e) => e.stopPropagation()}
            // Change color when hovered over
            onMouseEnter={(e) => (e.currentTarget.style.color = color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
          >
            View booking page
          </Link>
        </div>
      )}

      <dl className='mt-6 flex gap-4 sm:gap-6 justify-between items-center'>
        {showLink && (
          <div
            className='flex flex-row items-center space-x-1'
            style={{
              cursor: "pointer",
              transition: "color 0.3s",
              color: "inherit",
            }}
            // Prevent div onClick function when lik is clicked
            onClick={handleCopyLink}
            // Change color when hovered over
            onMouseEnter={(e) => (e.currentTarget.style.color = color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
          >
            <dt className='text-sm font-medium'>
              <HiOutlineLink className='h-4 w-4' />
            </dt>
            <dd className='text-sm'>Copy link</dd>
          </div>
        )}

        {/* todo: implement share feature */}
        {/* <div
          className='flex flex-row items-center space-x-1'
          style={{
            cursor: "pointer",
            transition: "color 0.3s",
            color: "inherit",
          }}
          // Prevent div onClick function when lik is clicked
          onClick={() => console.log("SHARE")}
          // Change color when hovered over
          onMouseEnter={(e) => (e.currentTarget.style.color = color)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
        >
          <dt className='text-sm font-medium'>
            <HiOutlineShare className='h-4 w-4' />
          </dt>
          <dd className='text-sm'>Share</dd>
        </div> */}
      </dl>
      {payment_required && (
        <div className='mt-4 flex items-center space-x-1 text-gray-600'>
          <dt className='text-sm font-medium'>
            <HiOutlineCreditCard className='h-4 w-4' />
          </dt>
          <dd className='text-sm'>${price}</dd>
        </div>
      )}
    </div>
  );
}
