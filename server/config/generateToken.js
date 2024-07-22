import JsonWebToken from "jsonwebtoken";

const generateToken = (id) => {
  return JsonWebToken.sign({ id }, "mySecret1234", {
    expiresIn: "2 days",
  });
};

export default generateToken;
