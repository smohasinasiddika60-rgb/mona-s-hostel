CREATE DATABASE IF NOT EXISTS monas_hostel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE monas_hostel;
CREATE TABLE IF NOT EXISTS residents (
  resident_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  resident_name VARCHAR(120) NOT NULL,
  room_no VARCHAR(20) NOT NULL,
  phone VARCHAR(25) NOT NULL,
  email VARCHAR(160) NULL,
  guardian VARCHAR(180) NULL,
  monthly_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  check_in DATE NOT NULL,
  check_out DATE NULL,
  fee_status ENUM('Pending','Paid','Partially Paid') NOT NULL DEFAULT 'Pending',
  stay_status ENUM('Checked in','Reserved','Checked out') NOT NULL DEFAULT 'Checked in',
  address TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_resident_name (resident_name),
  INDEX idx_room_no (room_no),
  INDEX idx_stay_status (stay_status),
  INDEX idx_fee_status (fee_status)
);
