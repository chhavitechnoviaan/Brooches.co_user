// import express from "express";

// import {
//   createContactQuery,
//   getContactQueries,
// } from "../controllers/contactController.js";

// const router = express.Router();

// router.post(
//   "/create",
//   createContactQuery
// );

// router.get(
//   "/all",
//   getContactQueries
// );

// export default router;


import express from "express";

import {
  createContactQuery,
  getContactQueries,
  replyToQuery,
} from "../controllers/contactController.js";

const router = express.Router();

router.post(
  "/create",
  createContactQuery
);

router.get(
  "/all",
  getContactQueries
);

// NEW
router.put(
  "/reply/:id",
  replyToQuery
);

export default router;