CREATE TABLE CHARACTER (
  id SERIAL UNIQUE,
  name TEXT UNIQUE,
  gender TEXT,
  status TEXT,
  born TEXT, 
  occupation TEXT,
  RANK TEXT,
  affiliations TEXT,
  portrayedBy TEXT,
  image TEXT,
  description TEXT,
  categories TEXT[],
  PRIMARY KEY (id)
);


  name,
  gender,
  status,
  born, 
  occupation,
  rank,
  affiliations,
  portrayedBy,
  image,
  description,
  categories
