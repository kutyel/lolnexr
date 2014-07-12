param($installPath, $toolsPath, $package, $project)

function Set-ItemTypeNone {
  param($item)
  
  $item.Properties.Item("{ItemType}").Value = "None"
}

$jsItem = $project.ProjectItems.Item("js")

$jQuerySource         = $jsItem.ProjectItems.Item("jquery-1.8.2-win8-1.0.js")
$jQueryVsdoc          = $jsItem.ProjectItems.Item("jquery-1.8.2-vsdoc.js")
$jQueryDeferredSource = $jsItem.ProjectItems.Item("jquery-win8-deferred.js")


Set-ItemTypeNone $jQuerySource
Set-ItemTypeNone $jQueryVsdoc
Set-ItemTypeNone $jQueryDeferredSource
