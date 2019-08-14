CREATE TABLE character (
  id SERIAL UNIQUE,
  name TEXT,
  gender TEXT,
  status TEXT,
  born TEXT, 
  occupation TEXT,
  rank TEXT,
  affiliations TEXT,
  portrayedBy TEXT,
  image TEXT,
  description TEXT,
  categories TEXT[],
  PRIMARY KEY (id)
);