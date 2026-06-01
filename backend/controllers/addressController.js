import Address from "../models/address.js";

export const createAddress = async (
  req,
  res
) => {
  try {

    const {
      fullName,
      mobile,
      alternateMobile,
      email,
      country,
      state,
      city,
      zipCode,
      address,
      landmark,
      addressType,
      isDefault,
    } = req.body;

    const newAddress = new Address({
      user: req.user._id,

      fullName,
      mobile,
      alternateMobile,
      email,
      country,
      state,
      city,
      zipCode,
      address,
      landmark,
      addressType,
      isDefault,
    });

    await newAddress.save();

    res.status(201).json({
      success: true,
      message: "Address Saved",
      address: newAddress,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getUserAddresses = async (
  req,
  res
) => {
  try {

    const addresses =
      await Address.find({
        user: req.user._id,
      }).sort({ createdAt: -1 });

    res.json({
      success: true,
      addresses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteAddress = async (
  req,
  res
) => {
  try {

    await Address.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Address Deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};