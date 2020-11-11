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
  UNIQUE KEY unique_email (email, deleted_at)
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

CREATE TABLE i18n (
  locale VARCHAR(10),
  path VARCHAR(200),
  translation VARCHAR(5000),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY unique_locale_path (locale, path)
);

CREATE TABLE files (
  path VARCHAR(256),
  originalname VARCHAR(512),
  mimetype VARCHAR(256),
  size INT,

  ref_table VARCHAR(256),
  ref_field VARCHAR(256),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (path),
  UNIQUE KEY unique_path (path)
);
