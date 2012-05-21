CREATE TABLE Object (
  objectid int NOT NULL,
  timest timestamp default current_timestamp,
  versioninfo varchar(30),
  isclosed int DEFAULT 0,
  isextension int DEFAULT 0,
  name varchar(50),
  defbody text,
  metadata text,
  userid int DEFAULT NULL,
  basedon int DEFAULT NULL,
  type varchar(20),
  infoid int,
  PRIMARY KEY (objectid)
);
CREATE SEQUENCE Object_seq;
CREATE TABLE Method (
  methodid int NOT NULL,
  timest timestamp default current_timestamp,
  versioninfo varchar(30),
  name varchar(50),
  category varchar(50),
  objectname varchar(50),
  basedon int DEFAULT NULL,
  userid int DEFAULT NULL,
  body text,
  type varchar(20),
  infoid int,
  PRIMARY KEY (methodid)
);
CREATE SEQUENCE Method_seq;
CREATE TABLE ObjectMethod (
  objectid int NOT NULL,
  methodid int NOT NULL,
  PRIMARY KEY (objectid,methodid)
);
CREATE TABLE Component (
  componentid int NOT NULL,
  timest timestamp default current_timestamp,
  versioninfo varchar(30),
  isclosed int DEFAULT 0,
  name varchar(50),
  userid int DEFAULT NULL,
  defcounter int DEFAULT 0,
  basedon int DEFAULT NULL,
  infoid int,
  PRIMARY KEY (componentid)
);
CREATE SEQUENCE Component_seq;
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
  userid int NOT NULL,
  name varchar(30),
  longname varchar(60),
  PRIMARY KEY (userid)
);
CREATE SEQUENCE Userlib_seq;
CREATE TABLE Info (
  infoid int NOT NULL,
  infotext text,
  PRIMARY KEY (infoid)
);
CREATE SEQUENCE Info_seq;
CREATE TABLE Configmap (
  configmapid int NOT NULL,
  name varchar(50),
  timest timestamp default current_timestamp,
  versioninfo varchar(30),
  isclosed int DEFAULT 0,
  userid int DEFAULT NULL,
  basedon int DEFAULT NULL,
  prescript text,
  postscript text,
  infoid int,
  PRIMARY KEY (configmapid)
);
CREATE SEQUENCE Configmap_seq;
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
