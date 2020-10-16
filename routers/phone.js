const express = require('express');
const Phone = require('../models/phone');
const router = new express.Router();

// Create a phone (development purposes)
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

// Get the phones list (development purposes)
router.get('/phones', async (req, res) => {
  try {
    const phones = await Phone.find({});
    res.send(phones);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get the details of a specific phone, by ID
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

// Delete a phone
router.delete('/phones/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const phone = await Phone.findById(_id);
    if (!phone) {
      return res.status(404).send({ error: 'Phone Not found' });
    }
    phone.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update phone details
router.patch('/phones/:id', async (req, res) => {
  const _id = req.params.id;
  // error handling if the user tries to update a non existing field
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'make',
    'model',
    'storage',
    'monthlyPremium',
    'excess',
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const phone = await Phone.findById(_id);
    if (!phone) {
      return res.status(404).send({ error: 'Phone Not found' });
    }
    updates.forEach((update) => {
      phone[update] = req.body[update];
      if (update === 'monthlyPremium') {
        phone.yearlyPremium = parseFloat(
          (phone.monthlyPremium * 11).toFixed(2)
        );
      }
    });
    await phone.save();
    res.send(phone);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
