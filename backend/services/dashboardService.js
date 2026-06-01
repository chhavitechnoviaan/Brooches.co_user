import axios from "axios";

const API =
"http://localhost:5000/api/dashboard";

export const getDashboardStatsAPI =
async () => {


const token =
  localStorage.getItem("token");

const { data } =
  await axios.get(
    `${API}/stats`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

return data;


};
