const express = require('express');
const Phone = require('../models/phone');
const router = new express.Router();

router.post('/phones', async (req, res) => {
  const phone = new Phone({ ...req.body });
  try {
    await phone.save(phone);
    res.status(201).send(phone);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
