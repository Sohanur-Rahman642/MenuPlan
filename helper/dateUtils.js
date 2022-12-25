import moment from "moment";

export const getConvertedDate = () => {
  var date = new Date();
  const formattedDate = moment(date).format("D MMMM YYYY");
  return formattedDate;
};

export const getConvertedDateTS = (timestamp) => {
  var date = new Date(timestamp);
  const formattedDate = moment(date).format("D MMMM YYYY");
  return formattedDate;
};

export const getConvertedDateFromString = (date) => {
  const formattedDate = moment(date, "D MMMM YYYY").format("YYYY-MM-DD");
  console.log("formattedDate ", formattedDate);
  return formattedDate;
};
