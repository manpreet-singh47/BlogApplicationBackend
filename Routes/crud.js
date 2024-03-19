const express = require("express");
const { Create, Read, Delete } = require("../Controllers/crudControl");
const router = express.Router();

router.post("/create/:user", Create);
router.get("/read", Read);
// router.put("/update", Update);
router.delete("/delete/:id", Delete);

module.exports = router;
