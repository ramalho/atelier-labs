# Extend Xotcl Library for XotclIDE purposes
# All Classes can belong (be defined) by an Component 
# (or can be extendet by Component)
# There is same Default Component "default" for all Classes,
# which does not belong to any Component
# Class and Object are extended with methods for handlig
# additional metainformation as Component and Method Categories

if {$tcl_platform(platform) eq "windows"} {
    set ad [pwd]
    cd $tcl_library
    package require XOTcl 1.3
    package require Tk 8.4
    cd $ad
}
if {![info exists xotcl::version]} {
    puts "loading XOTcl"
    package require XOTcl 1.3
    puts "loading Tk"
    package require Tk 8.4
}

if {![xotcl::Object isobject Object]} {
   namespace import xotcl::*
}

Class instproc addCategory {category} {
    return [my addCategoryB $category {}]
}
Class instproc moveToCategory {method category} {
    return [my moveToCategoryB $method $category {}]
}
Class instproc renameCategory {oldname newname} {
    return [my renameCategoryB $oldname $newname {}]
}
Class instproc deleteCategory {name} {
    return [my deleteCategoryB $name {}]
}
Class instproc uncategoryFor {name} {
    return [my uncategoryForB $name {}]
}
Class instproc getCategoryForMethod {method} {
    return [my getCategoryForMethodB  $method {}]
}
Class instproc getCategories {} {
    return [my getCategoriesB {}]
}
Class instproc getMethodsForCategory {category} {
    return [my getMethodsForCategoryB $category {}]
}
Class instproc moveToComponent {app} {
    set oldapp [my getCompObject]
    $oldapp removeClass [self]
    my setMetadata component $app
    set newapp [IDE::Component getCompObjectForName $app]
    $newapp addClass [self]
}
Class instproc getHeritage {} {
    set hlist [self]
    foreach sclass [my info superclass] {
	if {$sclass eq "::Object" || $sclass eq "::xotcl::Object"} continue
	lappend hlist [$sclass getHeritage]
    }
    return $hlist
}
Class instproc getChildrenHierarchy {} {
    set hlist [self]
    foreach sclass [my info subclass] {
	lappend hlist [$sclass getChildrenHierarchy]
    }
    return $hlist
}
Class instproc getHeritageFlat {} {
    # this function return another order then info heritage
    # first base classe and it is no reverse of ingo heritage
    set hlist [my info superclass]
    foreach sclass [my info superclass] {
	set hlist [concat [$sclass getHeritageFlat] $hlist]
    }
    return $hlist
}
Class instproc getDeepChildren {} {
    set list [my info subclass]
    foreach sclass [my info subclass] {
        set list [concat $list [$sclass getDeepChildren]]
    }
    return $list 
}
Class instproc getAllInstMethods { {ignoreList {}} } {
    set methods [my info instprocs]
    foreach class [my info heritage] {
        if {$ignoreList ne "" && [ide::lcontain $ignoreList $class]} continue
	set methods [concat $methods [$class info instprocs]]
    }
    return [lsort -unique $methods]
}
Class instproc getAllFullInstMethods { {ignoreList {}} } {
    set fmethods {}
    foreach m [my info instprocs] {
	lappend fmethods [list $m [self]]
        set marr($m) 1
    }
    foreach class [my info heritage] {
        if {$ignoreList ne "" && [ide::lcontain $ignoreList $class]} continue
        foreach m [$class info instprocs] {
	    if {![::info exist marr($m)]} {
                lappend fmethods [list $m $class]
                set marr($m) 1
            }
        }
    }
    return $fmethods
}

Object instproc getSubobjectsHierarchy {} {
    ::set hlist [self]
    foreach sobject [lsort [my info children]] {
	::lappend hlist [$sobject getSubobjectsHierarchy]
    }
    return $hlist
}
Object instproc inspect {} {
    my basicInspect
}
Object instproc basicInspect {} {
    IDE::ObjectBrowser newBrowser [self]
}
Object instproc halt {{symbol {}}} {
    if {[Object isobject IDE::Debugger]} {
       IDE::Debugger startDebugging
    }
}
Object instproc metadataDefBody {meta} {
    ::set script {}
    ::append script "@ [self] idemeta $meta [list [[self] getMetadata $meta]]\n"
    return $script
}
Object instproc metadataBody {meta} {
    return "@ [string trimleft [self] :] idemeta $meta [list [[self] getMetadata $meta]]\n"
}

Object instproc metadataAsScript {} {
    ::set script {}
    my instvar _idemeta
    foreach meta [lsort [array names _idemeta]] {
        if {[ide::lcontain {categoriesMethodsProcs  categoriesProcs categoriesMethods categories} $meta] && $_idemeta($meta) eq ""} continue
	::append script [my metadataDefBody $meta]
    }
    return $script
}
Object instproc metadataAsScriptPur {} {
    ::set script {}
    my instvar _idemeta
    foreach meta [array names _idemeta] {
        if {[ide::lcontain {categoriesMethodsProcs  categoriesProcs categoriesMethods categories component} $meta]} continue
	::append script [my metadataDefBody $meta]
    }
    return $script
}
Object instproc getComponentName {} {
    if {[my hasMetadataNotEmpty component]} {
	return [my getMetadata component]
    }  else {
	return default
    }
}
Object instproc getCompObject {} {
    if {[my hasMetadataNotEmpty component]} {
	return [IDE::Component getCompObjectForName [my getMetadata component]]
    }  else {
	return [IDE::Component getCompObjectForName default]
    }
}
Object intproc getDescription {} {
    return [self]::description
}
Object instproc moveToComponent {app} {
    ::set oldapp [my getCompObject]
    $oldapp removeObject [self]
    my setMetadata component $app
    ::set newapp [IDE::Component getCompObjectForName $app]
    $newapp addObject [self]
}
Object instproc renameCategoryB {oldname newname {postFix Procs}} {
    if {![my hasMetadata categories$postFix]} {return 0}
    ::set categories [my getMetadata categories$postFix]
    if {[::set index [lsearch $categories $oldname]]<0} {
	return 0
    }
    ::set categories [lreplace $categories $index $index $newname]
    my setMetadata categories$postFix $categories
    return 1
}
Object instproc deleteCategoryB {name {postFix Procs}} {
    if {![my hasMetadata categories$postFix]} {return 0}
    ::set categories [my getMetadata categories$postFix]
    if {[::set index [lsearch $categories $name]]<0} {
	return 0
    }
    ::set categories [lreplace $categories $index $index]
    my setMetadata categories$postFix $categories
    my setMetadata categoriesMethods$postFix [lreplace [my getMetadata categoriesMethods$postFix] $index $index]
    return 1
}
Object instproc addCategoryB {category {postFix Procs}} {
    my initCategories $postFix

    ::set categories [my getMetadata categories$postFix]
    if {[::set index [lsearch $categories $category]]<0} {
	::set index [llength $categories]
	::lappend categories $category
	my setMetadata categories$postFix $categories
	my setMetadata categoriesMethods$postFix [concat [my getMetadata categoriesMethods$postFix] [list {}]]
    }
    return $index
}
Object instproc moveToCategoryB {method category {postFix Procs}} {
    my uncategoryForB $method $postFix

    if {$category eq "_all_categories" || $category eq "_uncategorized"} return
    ::set catindex [my addCategoryB $category $postFix]

    ::set cm [my getMetadata categoriesMethods$postFix]
    ::set category [concat [lindex $cm $catindex] $method]
    ::set cm [lreplace $cm $catindex $catindex $category]
    my setMetadata categoriesMethods$postFix $cm
}
Object instproc uncategoryForB {method {postFix Procs}} {
    my initCategories $postFix

    ::set catindex 0
    foreach cat [::set cm [my getMetadata categoriesMethods$postFix]] {
	if {[::set index [lsearch $cat $method]]>=0} {
	    ::set cat [lreplace $cat $index $index]
	    my setMetadata categoriesMethods$postFix [lreplace $cm $catindex $catindex $cat]
	    return
	}
	::incr catindex
    }
}
Object instproc initCategories {postFix} {
    if {![my hasMetadata categories$postFix]} {
	my setMetadata categories$postFix {}
	my setMetadata categoriesMethods$postFix {}
	return
    }
}
Object instproc getCategoryForMethodB {method {postFix Procs}} {
    my initCategories $postFix
    
    ::set catindex 0
    foreach cat [my getMetadata categoriesMethods$postFix] {
	if {[::set index [lsearch $cat $method]]>=0} {
	    return [lindex [my getMetadata categories$postFix] $catindex]
	}
	::incr catindex
    }
    return {}
}

Object instproc getCategoriesB {{postFix Procs}} {
    my initCategories $postFix

    return [::concat [my getMetadata categories$postFix] _all_categories _uncategorized]
}
Object instproc getMethodsForCategoryB {category {postFix Procs}} {
    if {$category eq "_all_categories"} {
        if {$postFix eq ""} {
	    ::set methods [my info instprocs]
	    foreach par [my info parameter] {
		::set parname [lindex $par 0]
		if {[::set index [::lsearch $methods $parname]]>=0} {
		    ::set methods [::lreplace $methods $index $index]
		}
	    }
	    return $methods 
	} else {
            return [my info procs]
        }
    } elseif {$category eq "_uncategorized"} {
        ::set allcategorized {} 
        foreach c [my getMetadata categoriesMethods$postFix] {
            ::set allcategorized [concat $allcategorized $c]
        }
        ::set all [my getMethodsForCategoryB _all_categories $postFix]
        ide::lremoveAll all $allcategorized
        return $all
    }
    ::set catindex [my addCategoryB $category $postFix]
    return [lindex [my getMetadata categoriesMethods$postFix] $catindex]
}
Object instproc printString {} {
    # please overweite it to specify your Object printSring
    # the return shoul short specify the object contens for
    # displaying in object inspector
    return "[self] instance of [[self] info class] [[self] info mixin]"
}
Object instproc getDescription {} {
    if {[Object isobject [self]::description]} {
        return [self]::description
    }
    return
}
Object instproc trackOn {} {
    IDE::MethodTracker registerObjectForTracking [self]
}
Object instproc trackOff {} {
    IDE::MethodTracker unregisterObjectForTracking [self]
}
Class instproc trackOn {} {
    IDE::MethodTracker registerClassForTracking [self]
}
Class instproc trackOff {} {
    IDE::MethodTracker unregisterClassForTracking [self]
}

# Metadata wrapper from old versions
Object instproc metadata args {
    puts "[self] metadata $args"
    if {[llength $args]==2} {
       my setMetadata [lindex $args 0] [lindex $args 1]
    } else {
	puts "calling metadata [self callingclass]>>[self callingproc] by [self callingobject]"
    }
    next
}
Object instproc hasMetadata key {
    my exists _idemeta($key)
}
Object instproc hasMetadataNotEmpty key {
    expr {[my hasMetadata $key] && [my set _idemeta($key)] ne ""}
}
Object instproc getMetadata key {
    my set _idemeta($key)
}
Object instproc setMetadata {key value} {
    my set _idemeta($key) $value
}
Class IDEMetadataAnalyzer
IDEMetadataAnalyzer instproc unknown {args} {
    if {[llength $args]==4 && [lindex $args 1] eq "idemeta" && [Object isobject [lindex $args 0]]} {
        #  $object setMetadata $type $value
	[lindex $args 0] setMetadata [lindex $args 2] [lindex $args 3]
    } else {
	my lappend metaList $args
    }
}
IDEMetadataAnalyzer @

#
# comments (documentation) interface
#
Object instproc hasComment {} {
  IDE::CommentsContainer objectHasComment [self]
}
Object instproc getComment {} {
  IDE::CommentsContainer objectGetComment [self]
}
Object instproc setComment  {text} {
  IDE::CommentsContainer objectSetComment [self] $text
}
Object instproc hasMethodComment {type method} {
  IDE::CommentsContainer objectMethodHasComment [self] $type $method
}
Object instproc getMethodComment {type method} {
  IDE::CommentsContainer objectMethodGetComment [self] $type $method
}
Object instproc setMethodComment {type method text} {
  IDE::CommentsContainer objectMethodSetComment [self] $type $method $text
}
Object instproc selfName {} {
    return [self]
}
