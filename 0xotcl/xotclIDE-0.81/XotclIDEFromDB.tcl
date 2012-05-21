#!/bin/sh
# \
exec tclsh "$0" ${1+"$@"}

# start File for use XotclIDE with version control
# almost all sources (also for XOTclIDE) are loaded from database
# you need installed version control database and imported
# all XOTclIDE sources to use this script
# use intallVC.tcl for it

set sname [info script]
if {$sname==""} {
    # Run interactive for develop purposes
    set xotclidedir /home/artur/programs/xotclIDE
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
    set xotclidedir [file normalize $xotclidedir]
}

source [file join $xotclidedir ideCore.tcl]
source [file join $xotclidedir ideBgError.tcl]

if {$xotclidedir==[pwd]} {
    lappend auto_path $xotclidedir
} else {
    lappend auto_path $xotclidedir [pwd]
}


package require xdobry::sql
package require IDEStart

IDEStarter startIDEFromDB
