# Database

## users

```sql

CREATE TABLE users (
  id               CHAR(36) NOT NULL,
  name             VARCHAR(255),
  email            VARCHAR(255),
  phone_no         VARCHAR(255),
  username         VARCHAR(255),
  password         VARCHAR(255),
  role             VARCHAR(255),
  is_active        BOOLEAN,

  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id)
);

```
