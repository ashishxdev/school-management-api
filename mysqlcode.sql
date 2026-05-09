-- DB STRUCTURE
CREATE DATABASE IF NOT EXISTS school_management;
use school_management;
CREATE TABLE IF NOT EXISTS schools(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schools (name, address, latitude, longitude) VALUES
('DAV Public School', "Pushpanjali Enclave", 28, 77.1),
('Mount Abu Public School', "Rohini Sector 5", 68, 67.112),
('MotherDivine Public School', "Rohini Sector 3", 23, 39.923),
('Yuvarshkti School', "Rohini Sector 3", 34.12, 97.1);

SELECT * FROM schools;