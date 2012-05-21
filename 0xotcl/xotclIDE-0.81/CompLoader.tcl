#!/usr/local/bin/xowish
# Componet Loader
# This short programm can load and start the applications specified in
# Xotcl-Image file.
# All Components are loaded from Database.
# The Xotcl-Image file is a tcl script that contains
# 3 lists (specify 3 variables).
# componentsToLoad 
# preStartScript
# startScript

set sname [info script]
if {$sname==""} {
    # Run interactive for develop purposes
    set progdir /home/artur/programs/xotclIDE
} else {
    file lstat $sname stats
    # follow sym links
    if {$stats(type)=="link"} {
	set sname [file readlink $sname]
	if {[file pathtype $sname]=="relative"} {
	    set sname [file join [file dirname [info script]] $sname]
	}
    }
    set xotclidedir [file dirname $sname]
}

source [file join $xotclidedir ideCore.tcl]
source [file join $xotclidedir ideBgError.tcl]

lappend auto_path $xotclidedir

package require xdobry::sql
package require IDEStart

IDEStarter startLoader
