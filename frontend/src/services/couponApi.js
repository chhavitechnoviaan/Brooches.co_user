import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/api/coupons`;

// GET
export const getCouponsAPI =
  async () => {

    const res = await axios.get(
      `${API}/all`
    );

    return res.data;
  };

// CREATE
export const createCouponAPI =
  async (data) => {

    const res = await axios.post(
      `${API}/create`,
      data
    );

    return res.data;
  };

// DELETE
export const deleteCouponAPI =
  async (id) => {

    const res = await axios.delete(
      `${API}/delete/${id}`
    );

    return res.data;
  };