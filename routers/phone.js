const express = require('express');
const Phone = require('../models/phone');
const router = new express.Router();
const moment = require('moment');

// Create a phone (development purposes)
router.post('/phones', async (req, res) => {
  const { make, model, storage, monthlyPremium, excess } = req.body;

  if (!make || !model || !storage || !monthlyPremium || !excess) {
    return res.status(400).send({
      error: 'make, model, monthlyPremium and excess must be provided',
    });
  }
  const yearlyPremium = parseFloat((monthlyPremium * 11).toFixed(2));
  const today = moment().format('YYYY-MM-DD');
  const newPhone = {
    make,
    model,
    storage,
    prices: [
      {
        startingDate: today,
        monthlyPremium,
        yearlyPremium,
        excess,
      },
    ],
  };
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

    const currentPrices = phone.prices.find((date) =>
      moment().isSameOrAfter(date.startingDate, 'day')
    );
    const currentPhoneDetails = {
      make: phone.make,
      model: phone.model,
      monthlyPremium: currentPrices.monthlyPremium,
      yearlyPremium: currentPrices.yearlyPremium,
      excess: currentPrices.excess,
    };

    res.send(currentPhoneDetails);
  } catch (error) {
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

// Update phone details (no prices)
router.patch('/phones/:id/details', async (req, res) => {
  const _id = req.params.id;
  // error handling if the user tries to update a non existing field
  const updates = Object.keys(req.body);
  const allowedUpdates = ['make', 'model', 'storage'];
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
    updates.forEach((update) => (phone[update] = req.body[update]));

    await phone.save();
    res.send(phone);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Update phone prices along with the start date
router.patch('/phones/:id/prices', async (req, res) => {
  const _id = req.params.id;
  const { monthlyPremium, excess, startingDate } = req.body;

  if (!monthlyPremium || !excess || !startingDate) {
    return res.status(400).send({
      error: 'monthlyPremium, excess & startingDate must be provided',
    });
  } else if (!moment(startingDate, 'YYYY-MM-DD', true).isValid()) {
    return res.status(400).send({
      error: 'The starting date must follow the format: YYYY-MM-DD',
    });
  }

  try {
    const phone = await Phone.findById(_id);
    if (!phone) {
      return res.status(404).send({ error: 'Phone Not found' });
    }

    const yearlyPremium = parseFloat((monthlyPremium * 11).toFixed(2));
    const pricesUpdated = {
      startingDate,
      monthlyPremium,
      yearlyPremium,
      excess,
    };
    let existingPrice;
    phone.prices.find((price, index) => {
      if (moment(price.startingDate).isSame(startingDate)) {
        phone.prices[index] = pricesUpdated;
        return (existingPrice = true);
      }
    });

    if (!existingPrice) phone.prices.push(pricesUpdated);
    phone.prices.sort((a, b) => moment(b.startingDate).diff(a.startingDate));

    await phone.save();
    res.send(phone);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
