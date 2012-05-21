#!/bin/sh
# \
exec tclsh "$0" ${1+"$@"}
 
# start File for use XotclIDE as stand alone application

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
source [file join $xotclidedir ideBase.tcl]

IDEStarter startIDEOnly

