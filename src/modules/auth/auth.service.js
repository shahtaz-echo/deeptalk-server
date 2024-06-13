const bcrypt = require("bcrypt");
const jwtHelpers = require("../../middlewears/helpers/jwtHelper");
const config = require("../../../config");
const { ApiError } = require("../../utiles/errors");
const User = require("../user/user.model");

const loginService = async (payload) => {
  const { email, password } = payload;
  const isExistUser = await User.findOne({ email });
  
  if (!isExistUser) {
    throw new ApiError(400, "User does not exist");
  }

  const { _id, role } = isExistUser;

  const isMatchPassword = await bcrypt.compare(password, isExistUser?.password);

  if (!isMatchPassword) {
    throw new ApiError(400, "Password is not correct!");
  }

  const accessToken = jwtHelpers.createToken(
    { _id, email, role },
    config.jwt.secret,
    config.jwt.expires_in
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, email, role },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );

  return {
    user: isExistUser,
    accessToken,
    refreshToken,
  };
};

const registerService = async (payload) => {
  const { email} = payload;
  const isExistUser = await User.findOne({ email });

  if (isExistUser) {
    throw new ApiError(400, "You already have an account, please Sign In");
  }

  const newUser = await  User.create(payload)

  const accessToken = jwtHelpers.createToken(
    { _id: newUser._id, email:newUser.email, role:newUser.role },
    config.jwt.secret,
    config.jwt.expires_in
  );

  const refreshToken = jwtHelpers.createToken(
    { _id: newUser._id, email:newUser.email, role:newUser.role },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );

  return {
    user: newUser,
    accessToken,
    refreshToken,
  };
};

const socialLoginService = async (payload) => {
  const { fullname, email, photoURL } = payload;

  const isExistUser = await User.findOne({ email });

  if (!isExistUser) {
    const newUser = await User.create({
      fullname,
      email,
      image: { url: photoURL, public_id: null },
    });

    if (newUser) {
      return createTokens(newUser);
    }
  }

  return createTokens(isExistUser);
};

const createTokens = async (user) => {
  const { _id, email, role } = user;

  const accessToken = await jwtHelpers.createToken(
    { _id, email, role },
    config.jwt.secret,
    config.jwt.expires_in
  );

  const refreshToken = await jwtHelpers.createToken(
    { _id, email, role },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret);
  } catch (error) {
    return {
      error: "Invalid Refresh Token",
      status: 422,
    };
  }

  const { _id } = verifiedToken;

  const isUserExist = await User.findById(_id);
  if (!isUserExist) {
    throw new ApiError(404, "User does not exist");
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.secret,
    config.jwt.expires_in
  );

  return {
    accessToken: newAccessToken,
    user: isUserExist,
  };
};

module.exports = {
  loginService,
  registerService,
  refreshToken,
  socialLoginService,
};
