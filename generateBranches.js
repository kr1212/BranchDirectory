const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Sample Indian cities
const cities = [
  { city: 'Delhi', state: 'Delhi' },
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Bangalore', state: 'Karnataka' },
  { city: 'Hyderabad', state: 'Telangana' },
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Kolkata', state: 'West Bengal' },
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Ahmedabad', state: 'Gujarat' },
  { city: 'Jaipur', state: 'Rajasthan' },
  { city: 'Lucknow', state: 'Uttar Pradesh' },
  { city: 'Bhopal', state: 'Madhya Pradesh' },
  { city: 'Patna', state: 'Bihar' },
  { city: 'Chandigarh', state: 'Chandigarh' },
  { city: 'Coimbatore', state: 'Tamil Nadu' },
  { city: 'Indore', state: 'Madhya Pradesh' },
  { city: 'Nagpur', state: 'Maharashtra' },
  { city: 'Surat', state: 'Gujarat' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { city: 'Vijayawada', state: 'Andhra Pradesh' }
];

// Random coordinate generator
function getRandomCoordinate(base, variance) {
  return (base + (Math.random() * variance - variance / 2)).toFixed(6);
}

// Generate branch data
const branches = [];
for (let i = 1; i <= 100; i++) {
  const cityObj = cities[Math.floor(Math.random() * cities.length)];
  branches.push({
    branchCode: `BR${String(i).padStart(3, '0')}`,
    branchName: `${cityObj.city} Branch ${i}`,
    branchCity: cityObj.city,
    branchState: cityObj.state,
    latitude: getRandomCoordinate(20.0, 10.0),
    longitude: getRandomCoordinate(78.0, 10.0)
  });
}

// Save branches.json
const outputPath = path.join(__dirname, 'data', 'branches.json');
fs.writeFileSync(outputPath, JSON.stringify({ branches }, null, 2));
console.log('✅ branches.json generated successfully!');

// Insert into SQLite database
const dbPath = path.join(__dirname, 'db', 'branches.db');

// Make sure db folder exists
if (!fs.existsSync(path.join(__dirname, 'db'))) {
  fs.mkdirSync(path.join(__dirname, 'db'));
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS branches`);
  db.run(`CREATE TABLE branches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    branchCode TEXT,
    branchName TEXT,
    branchCity TEXT,
    branchState TEXT,
    latitude TEXT,
    longitude TEXT
  )`);

  const stmt = db.prepare(`INSERT INTO branches (branchCode, branchName, branchCity, branchState, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)`);

  branches.forEach(branch => {
    stmt.run(branch.branchCode, branch.branchName, branch.branchCity, branch.branchState, branch.latitude, branch.longitude);
  });

  stmt.finalize();
});

db.close(() => {
  console.log('✅ branches.db populated successfully with 100 branches!');
});
