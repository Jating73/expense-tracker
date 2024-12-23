import { Expense } from "../models/expense.model.js";

export const addExpense = async (req, res) => {
    try {

        const { description, amount, category } = req.body;
        const userId = req.id;

        if (!description || !amount || !category) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const expense = await Expense.create({
            description,
            amount,
            category,
            userId
        });

        return res.status(201).json({
            message: "New Expense Added",
            expense,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong, Please try again later",
            error: error.message,
            success: false
        })
    }
}

export const getAllExpense = async (req, res) => {
    try {
        const userId = req.id;

        const category = req.query.category || "";
        const done = req.query.done || "";

        const query = {
            userId
        }

        if (category !== "" && category.toLowerCase() !== "all") {
            query.category = { $regex: category, $options: "i" }
        }
        if (done !== "") {
            query.done = done
        }

        const expense = await Expense.find(query);

        if (!expense || expense.length === 0) {
            return res.status(404).json({ message: "No expense found", success: false });
        }

        return res.status(200).json({
            message: "",
            expense,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong, Please try again later",
            error: error.message,
            success: false
        })
    }
}

export const markExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const { done } = req.body;

        const expense = await Expense.findByIdAndUpdate(expenseId, { done }, { new: true });
        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
                success: false
            });
        }

        return res.status(200).json({
            message: `Expense mark as ${expense.done ? 'done' : 'undone'}`,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong, Please try again later",
            error: error.message,
            success: false
        })
    }
}

export const removeExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;

        await Expense.findByIdAndDelete(expenseId);

        return res.status(200).json({
            message: `Expense removed`,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong, Please try again later",
            error: error.message,
            success: false
        })
    }
}

export const updateExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;
        const expenseId = req.params.id;

        const updateData = {
            description,
            amount,
            category
        };

        const expense = await Expense.findByIdAndUpdate(expenseId, updateData, { new: true });

        return res.status(200).json({
            message: `Expense Updated`,
            success: true,
            expense
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong, Please try again later",
            error: error.message,
            success: false
        })
    }
}