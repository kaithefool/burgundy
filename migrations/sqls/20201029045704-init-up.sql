CREATE TABLE users (
  id CHAR(21),
  email VARCHAR(320) NOT NULL,
  password VARCHAR(270),
  role ENUM('admin', 'customer'),

  last_logout TIMESTAMP,
  active BOOLEAN DEFAULT 1,
  reset_locked BOOLEAN DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  not_deleted BOOLEAN NULL DEFAULT 1,

  PRIMARY KEY (id),
  UNIQUE KEY unique_email (email, not_deleted)
);

CREATE TABLE registrants (
  id CHAR(21),
  email VARCHAR(320) NOT NULL,
  password VARCHAR(270),
  role ENUM('admin', 'customer'),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  not_deleted BOOLEAN NULL DEFAULT 1,

  PRIMARY KEY (id)
);

CREATE TABLE pwd_resets (
  id CHAR(21),
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

CREATE TABLE files (
  path VARCHAR(30),
  name VARCHAR(512),
  mime VARCHAR(256),
  size INT,

  ref_table VARCHAR(256),
  ref_field VARCHAR(256),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  not_deleted BOOLEAN NULL DEFAULT 1,

  PRIMARY KEY (path),
  UNIQUE KEY unique_path (path, not_deleted)
);

CREATE TABLE i18n (
  lng VARCHAR(10),
  ns VARCHAR(25),
  path VARCHAR(200),
  translation VARCHAR(5000),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  not_deleted BOOLEAN NULL DEFAULT 1,

  UNIQUE KEY (lng, ns, path, not_deleted)
);

CREATE TABLE views (
  id CHAR(21),
  lng VARCHAR(10),
  path VARCHAR(200),
  type ENUM('meta', 'page'),

  title VARCHAR(200),
  description VARCHAR(500),
  cover VARCHAR(300),
  grid JSON,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  not_deleted BOOLEAN NULL DEFAULT 1,

  PRIMARY KEY (id),
  UNIQUE KEY (lng, path, not_deleted)
);

CREATE TABLE view_cells (
  id CHAR(21),
  view CHAR(21),
  meta VARCHAR(5000),
  content MEDIUMTEXT,

  PRIMARY KEY (id),
  INDEX (view),
  FULLTEXT (meta)
);
