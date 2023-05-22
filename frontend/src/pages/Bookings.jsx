import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingTypeCard from "../components/BookingTypeCard";
import ScheduleBookingModal from "../components/ScheduleBookingModal";

export default function Bookings() {
  const { username } = useParams();
  const [bookingTypes, setBookingTypes] = useState([]);
  const [selectedBookingType, setSelectedBookingType] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URl}/api/booking_types/get_booking_types/`,
        {
          params: { username: username },
        }
      )
      .then((response) => {
        console.log("bookin type: ", response.data);
        setBookingTypes(response.data.booking_types);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCardClick = async (e) => {
    e.preventDefault();
    console.log("handle click");
    const bookingType = bookingTypes.filter(
      (bookingType) => bookingType.id === e.currentTarget.id
    );
    setSelectedBookingType(bookingType);
    setShow(true);
  };
  return (
    <>
      <ScheduleBookingModal
        show={show}
        setShow={setShow}
        bookingType={selectedBookingType[0]}
      />
      <div className='mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:px-8'>
        <div className='grid lg:grid-cols-3 gap-4 grid-cols-1 py-16'>
          {bookingTypes.map((bookingType) => {
            return (
              <BookingTypeCard
                key={bookingType.id}
                id={bookingType.id}
                name={bookingType.name}
                description={bookingType.description}
                duration={parseInt(bookingType.duration)}
                color={bookingType.color}
                payment_required={bookingType.payment_required}
                price={bookingType.price}
                onClick={(e) => handleCardClick(e)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
