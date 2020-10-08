const express = require('express');
const Phone = require('../models/phone');
const router = new express.Router();

router.post('/phones', async (req, res) => {
  const newPhone = { ...req.body };
  newPhone.yearlyPremium = parseFloat(
    (newPhone.monthlyPremium * 11).toFixed(2)
  );
  const phone = new Phone(newPhone);
  try {
    await phone.save(phone);
    res.status(201).send(phone);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get('/phones', async (req, res) => {
  try {
    const phones = await Phone.find({});
    res.send(phones);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/phones/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const phone = await Phone.findById(_id);
    if (!phone) {
      return res.status(404).send({ error: 'Phone Not found' });
    }
    res.send(phone);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
