const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');
const Item = require('../models/Item');

// @route   GET /api/items
// @desc    Get all loot items
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/solve
// @desc    Run the C-based knapsack solver
router.post('/solve', (req, res) => {
    const { items, capacity } = req.body;

    // Path to the compiled C executable
    const solverExecutable = process.platform === 'win32' ? 'knapsack_solver.exe' : 'knapsack_solver';
    const cSolverPath = path.join(__dirname, '..', '..', 'algorithm', solverExecutable);

    const cProcess = spawn(cSolverPath);

    cProcess.on('error', (err) => {
        console.error('Failed to start C solver:', err);
        return res.status(500).json({ msg: 'Error starting knapsack solver', error: err.message });
    });

    let outputData = '';
    let errorData = '';

    // Listen for data from the C program's stdout
    cProcess.stdout.on('data', (data) => {
        outputData += data.toString();
    });

    // Listen for errors
    cProcess.stderr.on('data', (data) => {
        errorData += data.toString();
    });

    // Handle process exit
    cProcess.on('close', (code) => {
        if (code !== 0 || errorData) {
            console.error(`C process exited with code ${code}`);
            console.error('Stderr:', errorData);
            return res.status(500).json({ msg: 'Error executing knapsack algorithm', error: errorData });
        }
        try {
            const result = JSON.parse(outputData);
            res.json(result);
        } catch (e) {
            console.error('Error parsing JSON from C script:', e);
            console.error('Raw output:', outputData);
            res.status(500).json({ msg: 'Failed to parse algorithm output' });
        }
    });

    // Format input for the C program: "capacity num_items\nvalue1 weight1\nvalue2 weight2\n..."
    let input = `${capacity} ${items.length}\n`;
    items.forEach(item => {
        input += `${item.value} ${item.weight}\n`;
    });

    // Send data to the C program's stdin
    cProcess.stdin.write(input);
    cProcess.stdin.end();
});

module.exports = router;