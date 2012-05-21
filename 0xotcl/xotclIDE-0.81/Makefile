VERSION = 0.81
RELEASE = 0
SUBVERSION = 80
# echo $VERSION | sed -e 's/.*[0-9]\.\([0-9]*\).*/\1/g'

# This makefile is used only to produce tar archives and
# install and uninstall

NAME=xotclIDE
PREFIX=/usr/local
INSTALLDIR = $(DESTDIR)$(PREFIX)/lib/xotclIDE
XOTCLIDEALL= xotclideall_`date +%m%d`

IDE_COMPS=IDEStart.xotcl IDEBaseGUI.xotcl IDEEditor.xotcl IDECore.xotcl IDEView.xotcl IDEPersistenceGUI.xotcl IDEPersistence.xotcl IDEPersistenceAdd.xotcl IDEDebug.xotcl SampleComponent.xotcl IDETestFramework.xotcl IDETests.xotcl IDEErrorReporter.xotcl IDEVCInstaller.xotcl IDEDocumentation.xotcl IDETclParser.xotcl IDEConfiguration.xotcl IDEPersistenceTests.xotcl IDEWikiReaper.xotcl IDEKitDeployer.xotcl IDEScriptEditor.xotcl IDERepositoryImporter.xotcl IDETkWinInspector.xotcl IDESQLBrowser.xotcl IDEFileBrowser.xotcl IDERegexpBrowser.xotcl IDEInternationalizationHelper.xotcl IDEUpdater.xotcl

ADD_COMPS=xdobry_sql.xotcl xdobry_mysql.xotcl xdobry_sqlDebug.xotcl Sample.cfmap idetests.cfmap xdobry_pgsql.xotcl xdobry_odbc.xotcl xdobry_sqlite.xotcl xdobry_access.xotcl xdobry_mssql.xotcl xdobry_oratcl.xotcl xometakit.xotcl pluginslist.txt

TCL_FILES=${IDE_COMPS} ${ADD_COMPS} XotclIDE.tcl XotclIDEDB.tcl XotclIDEFromDB.tcl CompLoader.tcl ideBase.tcl initDB.tcl ideCore.tcl schema_mysql.sql schema_postgres.sql schema_odbc.sql schema_sqlite.sql schema_access.sql schema_metakit.sql START.tcl ideBgError.tcl installVC.tcl XOTclIDE.xotcl

.PHONY : dist install uninstal tclkit publictclkit

dist:
	mkdir ${NAME}-${VERSION}
	mkdir ${NAME}-${VERSION}/docs
	cp IDECHANGES ${NAME}-${VERSION}/CHANGES
	cp IDEREADME ${NAME}-${VERSION}/README
	cp LICENSE INSTALL Makefile ${TCL_FILES} ${NAME}-${VERSION}
	cd ${NAME}-${VERSION} ; echo "pkg_mkIndex -direct . *.xotcl" | tclsh 
	tar -cvzf ${NAME}-${VERSION}-${RELEASE}.tar.gz ${NAME}-${VERSION}
	rm -f -r ${NAME}-${VERSION}

install:
	install -d $(INSTALLDIR)
	install -m 0644 ${TCL_FILES} pkgIndex.tcl $(INSTALLDIR)
	install CompLoader.tcl XotclIDE.tcl XotclIDEDB.tcl XotclIDEFromDB.tcl $(INSTALLDIR)

uninstall:
	rm -r -f $(INSTALLDIR)

tclkit:
	rm -rf tclkit/xotclIDE${SUBVERSION}.vfs
	mkdir -p tclkit/xotclIDE${SUBVERSION}.vfs/lib/xotclide
	cp ${IDE_COMPS} ${ADD_COMPS} schema_*.sql ideBase.tcl initDB.tcl ideCore.tcl ideBgError.tcl XOTclIDE.xotcl tclkit/xotclIDE${SUBVERSION}.vfs/lib/xotclide
	cp tclkit/main.tcl tclkit/xotclIDE${SUBVERSION}.vfs
	cp -r tclkit/lib tclkit/xotclIDE${SUBVERSION}.vfs
	cp ideBgError.tcl IDEStart.xotcl pkgIndex.tcl xdobry_sql.xotcl ideBase.tcl ideCore.tcl initDB.tcl pluginslist.txt xometakit.xotcl tclkit/xotclIDE-mk.vfs/lib/xotclide
	cd tclkit/xotclIDE${SUBVERSION}.vfs/lib/xotclide ; echo "pkg_mkIndex -verbose -direct . *.xotcl" | tclsh
	make -C tclkit SUBVERSION=${SUBVERSION} tclkit

publictclkit:
	make -C tclkit SUBVERSION=${SUBVERSION} publictclkit

allxdobry:
	mkdir ${XOTCLIDEALL}
	cp -r *.xotcl *.tcl *.msg *.sql *.cfmap *.xsl bitmaps sample dtd xd_docs ${XOTCLIDEALL}
	tar -cvzf ${XOTCLIDEALL}.tar.gz ${XOTCLIDEALL}
	rm -f -r ${XOTCLIDEALL}





