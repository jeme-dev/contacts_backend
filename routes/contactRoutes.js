const express = require("express");
const router = express.Router();
const validateTokenHandler = require("../middleware/validateTokenHandler")
const {
  getContact,
  createContact,
  getSpecificContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactController");

router.use(validateTokenHandler);
router.route("/").get(getContact).post(createContact);
router
  .route("/:name")
  .get(getSpecificContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
