import JsonWebToken from "jsonwebtoken";

const generateToken = (id) => {
  return JsonWebToken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2 days",
  });
};

export default generateToken;
