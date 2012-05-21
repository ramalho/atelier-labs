# use this tcl script
# to start XotclIDE from your Xotcl Component
# 1. cd XotclIDE_path
# 2. source START.tcl

package require Tk
package require XOTcl


if {![info exist xotclidedir]} {
  set xotclidedir [pwd]
}

if {![file exist [file join $xotclidedir ideBase.tcl]]} {
    error "change the dictionary to XotclIDE, System can not find ideBase.tcl file"
}

source [file join $xotclidedir ideBase.tcl]

IDEStarter startIDEFromApp
