
# Extend Xotcl Library for XotclIDE purposes
# All Classes can belong (be defined) by an Component 
# (or can be extendet by Component)
# There is same Default Component "default" for all Classes,
# which does not belong to any Component
# Class and Object are extended with methods for handlig
# additional metainformation as Component and Method Categories

source [file join $xotclidedir ideCore.tcl]
source [file join $xotclidedir ideBgError.tcl]

if {$xotclidedir==[pwd]} {
    lappend auto_path $xotclidedir
} else {
    lappend auto_path $xotclidedir [pwd]
}

package require IDEStart
package require IDECore
package require IDEBaseGUI
package require IDEView
package require IDETclParser
package require IDEEditor
package require IDEDebug
package require IDEErrorReporter



