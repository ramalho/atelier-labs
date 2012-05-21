#!/bin/sh
# \
exec tclsh "$0" ${1+"$@"}

# start File for installing XotclIDE version cotrol repositry
# you will need special sql interfaces or metakit package
# more info see documentation

set sname [info script]
if {$sname==""} {
    # Run interactive for develop purposes
    set progdir /home/artur/xotclIDE
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

source [file join $xotclidedir ideBase.tcl]
package require IDEVCInstaller
package require IDEStart
package require xdobry::sql

IDE::InstallerGUI installer .

