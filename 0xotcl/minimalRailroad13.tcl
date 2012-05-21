
# --- load packages
package require XOTcl
namespace import ::xotcl::*

# --- define dummy @ procedure
#proc @ args {}
# ===========================
# automatically generated from XOTclIDE
@ Component SampleComponent {

}

package provide SampleComponent 0.2

Class Line -parameter { xi yi xf yf }

@ ::Line  idemeta component SampleComponent

Line instproc init {} {
puts "drawLine"
[[self] info parent] instvar c
[self] instvar xi yi xf yf
$c create line $xi $yi $xf $yf -fill red
#$c create line 10 10 200 200 -fill red

}





#  ================  class Railroad

Class Railroad -parameter { {xp0 50} {speed 4}}

@ ::Railroad idemeta component SampleComponent

Railroad instproc break {} {
  [self] incr speed -2
  if {[[self] set speed]<0} {[self] set speed 0}
}

Railroad instproc destroy {} {
  [self] instvar afterHandle c
  after cancel $afterHandle
  if {[winfo toplevel $c]=="."} {
     ::destroy $c
  } else {
     ::destroy [winfo toplevel $c]
  }
  next
}



Railroad instproc emergencyBreak {} {
  [self] set speed 0
}


Railroad instproc init {} {
  [self] instvar c xp0
  set c .c

  canvas $c -width 600 -height 460 -background lightblue
  pack $c

  bind $c <1> [list [self] throttle]
  bind $c <2> [list [self] break]
  bind $c <3> [list [self] emergencyBreak]

  $c delete all

 #Line new -childof [self] -xi 100 -yi 100 -xf 200 -yf 200
 [self] tick
}



Railroad instproc throttle {} {
  [self] incr speed 6
}

Railroad instproc tick {} {
  [self] instvar afterHandle
  [self] turn
  set afterHandle [after 10 [self] tick]
}

Railroad instproc turn {} {
  puts "turn"
  [self] instvar c alpha speed xp0

  incr xp0

  $c create line 90 121 $xp0 121 -width 2 -fill white -tag piston ;#CW

}

Railroad new


