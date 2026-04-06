# Steal the Loot – Knapsack Game

This is a modern, interactive web application that demonstrates the 0/1 Knapsack Algorithm in a visual and engaging way. Users play as a thief selecting loot, and can then compare their choices with the optimal solution found by a Dynamic Programming algorithm written in C.

## Tech Stack
- **Frontend:** React.js + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Algorithm:** C (compiled and executed by the Node.js backend)

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (make sure the service is running)
- A C compiler like [GCC](https://gcc.gnu.org/) (usually pre-installed on Linux/macOS, available via MinGW on Windows)

## 🛠️ Step-by-Step Setup

### 1. Clone the Repository
Clone this project to your local machine. All the provided files should be inside a root folder named `steal-the-loot-game`.

### 2. Backend Setup
Navigate to the backend directory and install dependencies.

```bash
cd steal-the-loot-game/backend
npm install