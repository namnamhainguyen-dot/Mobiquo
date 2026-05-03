const Bonus = require('../models/bonus');
const mongoose = require('mongoose');

exports.getAll = async (req, res) => {
    try {
        const data = await Bonus.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await Bonus.findById(req.params.id);
        if (!data) return res.status(404).json({ message: "Không tìm thấy" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newItem = new Bonus(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await Bonus.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await Bonus.findByIdAndDelete(req.params.id);
        res.json({ message: "Xóa thành công" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};