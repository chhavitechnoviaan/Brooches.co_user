import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/api/notifications`;

export const getNotificationsAPI =
  async () => {

    const res =
      await axios.get(API);

    return res.data;
  };

export const markReadAPI =
  async (id) => {

    await axios.put(
      `${API}/read/${id}`
    );
  };
  
export const markAllReadAPI =
  async () => {

    await axios.put(
      `${API}/read-all`
    );
  };

export const deleteNotificationAPI =
  async (id) => {

    await axios.delete(
      `${API}/${id}`
    );
  };

export const clearNotificationsAPI =
  async () => {

    await axios.delete(
      `${API}/clear/all`
    );
  };