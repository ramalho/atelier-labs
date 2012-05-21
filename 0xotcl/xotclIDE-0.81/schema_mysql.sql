CREATE TABLE Object (
  objectid int NOT NULL auto_increment,
  timest TIMESTAMP(14),
  versioninfo varchar(30),
  isclosed bool DEFAULT 0,
  isextension bool DEFAULT 0,
  name varchar(50),
  defbody text,
  metadata text,
  userid int DEFAULT NULL,
  basedon int DEFAULT NULL,
  type enum('Class','Instance','ProcsGroup'),
  infoid int,
  PRIMARY KEY (objectid)
);
CREATE TABLE Method (
  methodid int NOT NULL auto_increment,
  timest TIMESTAMP(14),
  versioninfo varchar(30),
  name varchar(50),
  category varchar(50),
  objectname varchar(50),
  basedon int DEFAULT NULL,
  userid int DEFAULT NULL,
  body text,
  type enum('Class','Instance','tclproc'),
  infoid int,
  PRIMARY KEY (methodid)
);
CREATE TABLE ObjectMethod (
  objectid int NOT NULL,
  methodid int NOT NULL,
  PRIMARY KEY (objectid,methodid)
);
CREATE TABLE Component (
  componentid int NOT NULL auto_increment,
  timest TIMESTAMP(14),
  versioninfo varchar(30),
  isclosed bool DEFAULT 0,
  name varchar(50),
  userid int DEFAULT NULL,
  defcounter int DEFAULT '0',
  basedon int DEFAULT NULL,
  infoid int,
  PRIMARY KEY (componentid)
);
CREATE TABLE ComponentObject (
  componentid int NOT NULL,
  objectid int NOT NULL,
  deforder int,
  PRIMARY KEY (componentid,objectid)
);
CREATE TABLE ComponentRequire (
  componentid int NOT NULL,
  name varchar(50)
);
CREATE TABLE Userlib (
  userid int NOT NULL auto_increment,
  name varchar(30),
  longname varchar(60),
  PRIMARY KEY (userid)
);
CREATE TABLE Info (
  infoid int NOT NULL auto_increment,
  infotext text,
  PRIMARY KEY (infoid)
);
CREATE TABLE Configmap (
  configmapid int NOT NULL auto_increment,
  name varchar(50),
  timest TIMESTAMP(14),
  versioninfo varchar(30),
  isclosed bool DEFAULT 0,
  userid int DEFAULT NULL,
  basedon int DEFAULT NULL,
  prescript text,
  postscript text,
  infoid int,
  PRIMARY KEY (configmapid)
);
CREATE TABLE ConfigmapComponent (
  configmapid int NOT NULL,
  componentid int NOT NULL,
  loadorder float,
  PRIMARY KEY (configmapid,componentid)
);
CREATE TABLE ConfigmapChildren (
  configmapid int NOT NULL,
  configmapchildid int NOT NULL,
  loadorder float,
  PRIMARY KEY (configmapid,configmapchildid)
);
