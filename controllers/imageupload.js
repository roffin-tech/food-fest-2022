// create Booking
export const uploadImage = (req, res) => {
  var response = {
    imageUrl: req.file.path
  };
  return res.json(response);
};
