// api/get_winners.js
let winners = []; // same memory store

export default function handler(req, res) {
  res.status(200).json({ winners });
}