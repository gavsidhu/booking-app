import { useNavigate } from "react-router-dom";
import BookingTypeCard from "../components/BookingTypeCard";
import PageHeading from "../components/PageHeading";
import { useEffect, useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";
import UpdateModal from "../components/UpdateModel";
import BookingsTable from "../components/BookingsTable";
import Cookies from "universal-cookie";
import { getCookie } from "../utils/getCookie";

const cookies = new Cookies();

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [bookingTypes, setBookingTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookingCardId, setBookingCardId] = useState();
  const [selectedBookingType, setSelectedBookingType] = useState([]);

  useEffect(() => {
    const csrftoken = getCookie("csrftoken");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URl}/api/booking_type/`, {
        params: { user_id: user.userId },
        headers: {
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setBookingTypes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCardClick = async (id) => {
    console.log(id);
    setBookingCardId(id);
    const bookingType = bookingTypes.filter(
      (bookingType) => bookingType.id === id
    );
    setSelectedBookingType(bookingType[0]);
    setShowModal(true);
  };
  return (
    <>
      <UpdateModal
        show={showModal}
        setShow={setShowModal}
        id={bookingCardId}
        bookingType={selectedBookingType}
      />
      <div className='mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:px-8'>
        <PageHeading
          heading='Dashboard'
          buttonText='Create booking type'
          onClick={() => navigate("/new-booking-type")}
        />
        <div className='grid lg:grid-cols-3 gap-4 grid-cols-1 py-16'>
          {bookingTypes.length > 0 &&
            bookingTypes.map((bookingType) => {
              return (
                <BookingTypeCard
                  key={bookingType.id}
                  id={bookingType.id}
                  name={bookingType.name}
                  description={bookingType.description}
                  duration={parseInt(bookingType.duration)}
                  color={bookingType.color}
                  showLink={true}
                  onClick={() => handleCardClick(bookingType.id)}
                />
              );
            })}
        </div>
        <BookingsTable bookingTypes={bookingTypes} />
      </div>
    </>
  );
}
