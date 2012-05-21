CREATE TABLE Object (
  objectid counter,
  timest DATETIME,
  versioninfo text(30),
  isclosed INTEGER,
  isextension INTEGER,
  name text(50),
  defbody memo,
  metadata memo,
  userid INTEGER,
  basedon INTEGER,
  type text(20),
  infoid INTEGER
);
CREATE TABLE Method (
  methodid counter,
  timest DATETIME,
  versioninfo varchar(30),
  name varchar(50),
  category varchar(50),
  objectname varchar(50),
  basedon int,
  userid int,
  body memo,
  type varchar(20),
  infoid int
);
CREATE TABLE ObjectMethod (
  objectid int NOT NULL,
  methodid int NOT NULL,
  PRIMARY KEY (objectid,methodid) 
);
CREATE TABLE Component (
  componentid counter,
  timest DATETIME,
  versioninfo varchar(30),
  isclosed int,
  name varchar(50),
  userid int,
  defcounter int,
  basedon int,
  infoid int
);
CREATE TABLE ComponentObject (
  componentid int,
  objectid int,
  deforder int,
  PRIMARY KEY (componentid,objectid)
);
CREATE TABLE ComponentRequire (
  componentid int NOT NULL,
  name varchar(50)
);
CREATE TABLE Userlib (
  userid counter,
  name varchar(30),
  longname varchar(60)
);
CREATE TABLE Info (
  infoid counter,
  infotext memo
);
CREATE TABLE Configmap (
  configmapid counter,
  name varchar(50),
  timest DATETIME,
  versioninfo varchar(30),
  isclosed int,
  userid int,
  basedon int,
  prescript memo,
  postscript memo,
  infoid int
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
