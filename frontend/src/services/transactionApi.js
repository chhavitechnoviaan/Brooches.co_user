import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/api/orders`;

export const getTransactionsAPI =
  async () => {

    const res =
      await axios.get(
        `${API}/transactions`
      );

    return res.data;
  };