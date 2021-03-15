export const SAVE_SUBMITTED_INFO = "ADD_TO_CART";

export const saveSubmittedInfo = (info) => {
  // Total Stay Calculation
  const arrivalDate = new Date(info.arrival);
  const departureDate = new Date(info.departure);
  const timeDifference = Math.abs(departureDate - arrivalDate);
  const dateDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const totalStay = dateDifference + 1;

  return {
    type: SAVE_SUBMITTED_INFO,
    payload: { ...info, totalStay: totalStay },
  };
};