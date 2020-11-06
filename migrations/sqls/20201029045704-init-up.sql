CREATE TABLE users (
  id VARCHAR(36) DEFAULT (UUID()),
  email VARCHAR(320) NOT NULL,
  password VARCHAR(256),
  role ENUM('admin', 'customer'),

  last_logout TIMESTAMP,
  active BOOLEAN DEFAULT 1,
  reset_locked BOOLEAN DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY email (email, deleted_at)
);

CREATE TABLE registrants (
  id VARCHAR(36) DEFAULT (UUID()),
  email VARCHAR(320) NOT NULL,
  password VARCHAR(256),
  role ENUM('admin', 'customer'),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,

  PRIMARY KEY (id)
);

CREATE TABLE pwd_resets (
  id VARCHAR(36) DEFAULT (UUID()),
  user VARCHAR(36),
  active BOOLEAN DEFAULT 1,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  FOREIGN KEY (user)
    REFERENCES users(id) ON DELETE CASCADE
);

CREATE EVENT expire_pwd_resets
ON SCHEDULE EVERY 1 MINUTE
DO
  DELETE FROM pwd_resets
  WHERE NOW() > expires_at;

CREATE TABLE translations (
  locale VARCHAR(10),
  translation VARCHAR(16383)
);
