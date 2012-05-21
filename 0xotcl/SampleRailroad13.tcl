
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



Class Wheel -parameter {r x y {spokes 24} {pivot 0} {color red} {tag ""}}

@ ::Wheel idemeta component SampleComponent



Wheel instproc init {} {
  [[self] info parent] instvar c alpha
  [self] instvar pivot color tag W r x y
  set alpha 0.
  set y [expr {$y-$r}]
  $c create oval [expr {$x-$r}] [expr {$y-$r}] [expr {$x+$r}] [expr {$y+$r}]  -outline white
  set r1 [expr {$r-2}]
  set W [$c create oval [expr {$x-$r1}] [expr {$y-$r1}] [expr {$x+$r1}]  [expr {$y+$r1}] -outline $color -width 2]
  #[self] drawSpokes

  if {$pivot} {
    set deg2arc [expr {atan(1.0)*8/360.}]
    set rp [expr {$r1*$pivot}]
    set xp [expr {$x-$rp*cos($deg2arc*$alpha)}]
    set yp [expr {$y-$rp*sin($deg2arc*$alpha)}]
    set new_pivot [$c create rect $xp $yp  [expr {$xp+1}] [expr {$yp+1}] -fill $color  -tag  [list $tag pivot]]
    [self] set act_pivot [list $new_pivot $pivot]

    $c create arc [expr {$x-$r1}] [expr {$y-$r1}] [expr {$x+$r1}] [expr {$y+$r1}]  -style chord -fill $color -start 310 -extent 80 -tag counterweight
    set pivot $new_pivot
  }
  set rh [expr {$r/12.}]
  $c create oval [expr {$x-$rh}] [expr {$y-$rh}] [expr {$x+$rh}]  [expr {$y+$rh}] -fill white -tag hub
  set r $r1
}


#  ================  class Railroad

Class Railroad -parameter {{speed 4}}

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

Railroad instproc drawRod {p0 p1 p2 p3} {
  [self] instvar c
  $c delete rod
  eval $c create rect [$c bbox $p1 $p3] -fill white -tag rod
  eval $c create line [lrange [$c bbox $p0] 0 1]  [lrange [$c bbox $p2] 0 1] -width 3 -fill white -tag rod
  $c raise rod
  $c raise pivot
}

Railroad instproc emergencyBreak {} {
  [self] set speed 0
}


Railroad instproc init {} {
  [self] instvar c

  set c .c

  canvas $c -width 600 -height 460 -background lightblue
  pack $c

  bind $c <1> [list [self] throttle]
  bind $c <2> [list [self] break]
  bind $c <3> [list [self] emergencyBreak]

  $c delete all


  $c create rect 70 32 85 50 -fill black -tag chimney

  $c create rect 90 120 92 122 -fill red -tag p0 ;# crossbar

 # $c create text 338 82 -text "01 234" -fill gold -font {Times 7}
 Line new -childof [self] -xi 100 -yi 100 -xf 200 -yf 200

 #Line new -childof [self]

  Wheel new -childof [self] -x 150 -y 150 -r 30 -pivot 0.5 -tag p1
  Wheel new -childof [self] -x 215 -y 150 -r 30 -pivot 0.5 -tag p2
  Wheel new -childof [self] -x 280 -y 150 -r 30 -pivot 0.5 -tag p3
  [self] drawRod p0 p1 p2 p3




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
  [self] instvar c alpha speed
  set alpha [expr {round($alpha+360-$speed)%360}]
  foreach i [$c find withtag counterweight] {
    $c itemconfig $i -start [expr {310-$alpha}]
  }
  $c delete spoke
  #foreach wheel [[self] info children] { $wheel drawSpokes }
  $c raise hub
  set xp0 [expr {105+15*sin(($alpha-90)*atan(1.0)*8/360)}]
  $c delete piston
  eval $c coords p0 $xp0 120 [expr {$xp0+2}] 122 ;#CW
  $c create line 90 121 $xp0 121 -width 2 -fill white -tag piston ;#CW
  [self] drawRod p0 p1 p2 p3
  $c raise p0
  foreach i [$c find withtag smoke] {
    if {[lindex [$c bbox $i] 3]<0} {
      $c delete $i
    } else {
      $c move $i [expr {rand()*$speed/3.}] [expr {rand()*2-2}]
    }
  }
  set t [eval $c create oval [$c bbox chimney] -fill white -outline white -tag smoke]
  $c move $t 0 -10
  $c lower smoke
}

Railroad new

#Wheel new
