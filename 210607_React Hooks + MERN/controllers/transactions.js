const Transaction = require('../models/Transaction')

/**
 * @desc Get all transactions
 * @route GET /api/v1/transactions
 * @access Public
 */
exports.getTransactions = async (req, res, next) => {
    // res.send('GET transactions! ') // test
    try {
        const transactions = await Transaction.find();

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        console.log('Error @getTransactions: ', error)
        return res.status(500).json({
            success: false,
            error: 'Server Error!'
        })
    }
}

/**
 * @desc Add transactions
 * @route POST /api/v1/transactions
 * @access Public
 */
 exports.addTransaction = async (req, res, next) => {
    // res.send('POST transactions! ') // test
    try {
        const { text, amount } = req.body;
    
        const transaction = await Transaction.create(req.body);
    
        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (error) {
        console.log('Error @addTransaction: ', error)

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error!'
            });
        }
    }
}

/**
 * @desc DELETE transactions
 * @route DELETE /api/v1/transactions/:id
 * @access Public
 */
 exports.deleteTransaction = async (req, res, next) => {
    // res.send('DELETE transactions! ') // test
    try {
        const transaction = await Transaction.findById(req.params.id);
        
        if (!transaction) {
            return res.status(400).json({
                success: false,
                error: 'No Transaction found'
            });
        }

        await transaction.remove();
        
        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        console.log('Error @deleteTransaction: ', error)
        
        return res.status(500).json({
            success: false,
            error: 'Server Error!'
        });
    }
}